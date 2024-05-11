window.addEventListener('load', function(e){
	loadWorkoutLog();
	setupFormHandling();
		
	//configureLookupByIdForm
	
	
});

// Function to load workout data from the server
let loadWorkoutLog = function (){
	// Create a new XMLHttpRequest object to interact with the server.
    let xhr = new XMLHttpRequest();
    // Initialize a request to the API endpoint to fetch all workouts using the GET method.
    xhr.open('GET', '/api/workouts', true);

    // Set up what happens when the server response is received.
    xhr.onreadystatechange = function() {
        // Check if the request is complete (readyState === 4) and was successful (status === 200).
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse the JSON response into a JavaScript array.
            let workouts = JSON.parse(xhr.responseText);
            // Call the function to display the workouts in a table.
           displayWorkouts(workouts);
           displayWorkoutsInTable(workouts);
        }
    };

    // Send the request to the server.
    xhr.send();
};

// Function to display workouts using div elements in a more traditional DOM manipulation way.
// Function to display workouts using div elements, using 'let' for variable declarations.
function displayWorkouts(workouts) {
    // Get the container div where workouts will be displayed.
    let contentDiv = document.getElementById('content');
    contentDiv.textContent = ''; // Clear existing content

    // Loop through each workout and create elements for each detail.
    for (let i = 0; i < workouts.length; i++) {
        let workout = workouts[i];
        let workoutDiv = document.createElement('div');
        workoutDiv.className = 'workout-details'; // line so that I can possibly use css styling to target this class

		// Convert duration from seconds to minutes and seconds
        let minutes = Math.floor(workout.duration / 60);
        let seconds = workout.duration % 60;
        let durationDisplay = `${minutes} min ${seconds} sec`;

        // Details to display
        let details = [
            'Date: ' + workout.date,
            'Type: ' + workout.type,
            'Duration: ' + durationDisplay,
            'Heart Rate Avg: ' + workout.heartRateAvg + ' bpm',
            'Fasted: ' + (workout.isFasted ? 'Yes' : 'No'),
            'Pre Workout Meal: ' + (workout.preWorkoutMeal ? 'Yes' : 'No'),
            'Caffeine Consumed: ' + (workout.caffeineConsumed ? 'Yes' : 'No'),
            'Notes: ' + workout.notes
        ];

        // Loop through each detail and create a paragraph element to display it.
        for (let j = 0; j < details.length; j++) {
            let p = document.createElement('p');
            p.textContent = details[j];
            workoutDiv.appendChild(p);
        }

        // Append the workout div to the container.
        contentDiv.appendChild(workoutDiv);
    }
}

// Function to create and populate a table with workout data
function displayWorkoutsInTable(workouts) {
    let table = document.createElement('table');
    table.className = 'table'; // Using Bootstrap class for styling
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Define table headers and append them
    let headers = ['Date', 'Type', 'Duration', 'Heart Rate Avg', 'Fasted', 'Pre Workout Meal', 'Caffeine Consumed', 'Notes'];
    let headerRow = document.createElement('tr');
    for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Populate table body with workout data
    for (let i = 0; i < workouts.length; i++) {
        let workout = workouts[i];
        let row = document.createElement('tr');
        
        // Duration conversion for display
        let minutes = Math.floor(workout.duration / 60);
        let seconds = workout.duration % 60;
        let durationDisplay = `${minutes} min ${seconds} sec`;

        // Directly creating and appending cells
        let dateCell = document.createElement('td');
        dateCell.textContent = workout.date;
        row.appendChild(dateCell);

        let typeCell = document.createElement('td');
        typeCell.textContent = workout.type;
        row.appendChild(typeCell);

        let durationCell = document.createElement('td');
        durationCell.textContent = durationDisplay;
        row.appendChild(durationCell);

        let heartRateCell = document.createElement('td');
        heartRateCell.textContent = workout.heartRateAvg + ' bpm';
        row.appendChild(heartRateCell);

        let fastedCell = document.createElement('td');
        fastedCell.textContent = workout.isFasted ? 'Yes' : 'No';
        row.appendChild(fastedCell);

        let mealCell = document.createElement('td');
        mealCell.textContent = workout.preWorkoutMeal ? 'Yes' : 'No';
        row.appendChild(mealCell);

        let caffeineCell = document.createElement('td');
        caffeineCell.textContent = workout.caffeineConsumed ? 'Yes' : 'No';
        row.appendChild(caffeineCell);

        let notesCell = document.createElement('td');
        notesCell.textContent = workout.notes;
        row.appendChild(notesCell);

        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    // Get tableContent div and append the created table to it
    let tableContentDiv = document.getElementById('tableContent');
    tableContentDiv.textContent = ''; // Clear any previous content
    tableContentDiv.appendChild(table);
}

// Configure the form event listeners for handling form submission
function setupFormHandling() {
    let form = document.getElementById('newWorkoutForm');
    form.addEventListener('submit', handleWorkoutFormSubmission);
}

// Handle form submission event
function handleWorkoutFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Handling workout form submission...");
    
    // Extracting minutes and seconds from the duration input
    const durationInput = document.getElementById('duration').value;
    const [minutes, seconds] = durationInput.split(':').map(Number); // need to split the input and convert to numbers

    // Collect data from the form
    let formData = {
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
		duration: (minutes * 60) + seconds, // Convert min and sec to total seconds
        heartRateAvg: document.getElementById('heartRateAvg').value,
        isFasted: document.getElementById('isFasted').checked,
        preWorkoutMeal: document.getElementById('preWorkoutMeal').checked,
        caffeineConsumed: document.getElementById('caffeineConsumed').checked,
        notes: document.getElementById('notes').value
    };

    // Log input values for verification
    console.log('Workout Data:', formData);

    // Validate the form data
    let errors = validateWorkoutFormData(formData);
    if (errors.length === 0) {
        submitWorkoutData(formData); // Submit data if no errors
    } else {
        displayErrors(errors); // Display errors if validation fails
    }
}

// validate form data
function validateWorkoutFormData(formData) {
    let errors = [];
    const durationPattern = /^\d{1,2}:\d{2}$/; // Pattern to match mm:ss format

    if (!formData.date || !formData.type || !formData.duration || !formData.heartRateAvg) {
        errors.push("All required fields must be completed.");
    }
    if (!durationPattern.test(document.getElementById('duration').value)) {
        errors.push("Duration must be in mm:ss format.");
    }
    return errors;
}

// submit workout data to the server
function submitWorkoutData(workoutData) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/workouts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Workout created successfully');
            loadWorkoutLog(); // Reload list of workouts
        }
    };
    xhr.send(JSON.stringify(workoutData));
}

// Display error messages
function displayErrors(errors) {
    let errorsDiv = document.getElementById('errors');
    errorsDiv.textContent = ''; // Clear existing errors
    errors.forEach(function(error) {
        let p = document.createElement('p');
        p.textContent = error;
        p.style.color = 'red'; // Set error message text color to red
        errorsDiv.appendChild(p);
    });
}
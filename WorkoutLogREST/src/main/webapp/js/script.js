window.addEventListener('load', function(e){
	loadWorkoutLog();
		
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

        // Details to display
        let details = [
            'Date: ' + workout.date,
            'Type: ' + workout.type,
            'Duration: ' + workout.duration + ' minutes',
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

        // Directly creating and appending cells
        let dateCell = document.createElement('td');
        dateCell.textContent = workout.date;
        row.appendChild(dateCell);

        let typeCell = document.createElement('td');
        typeCell.textContent = workout.type;
        row.appendChild(typeCell);

        let durationCell = document.createElement('td');
        durationCell.textContent = workout.duration + ' minutes';
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

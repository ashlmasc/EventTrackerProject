window.addEventListener('load', function(e) {
	loadWorkoutLog();
});

function initializeForm() {
	let workoutIdElement = document.getElementById('workoutId');
	if (workoutIdElement) {
		let workoutId = workoutIdElement.value;
		if (workoutId) {
			setupFormForUpdate(workoutId);
		} else {
			setupFormForCreate();
		}
	} else {
		console.error("workoutId element not found");
	}

	let age = getUserAge();
	if (age) {
		document.getElementById('age').value = age;
	}

	// Added listener to age input to store value in sessionStorage when it changes
	document.getElementById('age').addEventListener('change', function() {
		storeUserAge();
	});
}


// Function to load workout data from the server
let loadWorkoutLog = function() {
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

		// Create and append update button
		let updateButton = document.createElement('button');
		updateButton.textContent = 'Update';
		updateButton.className = 'btn btn-primary';
		updateButton.onclick = function() {
			setupFormForUpdate(workout);
		};
		workoutDiv.appendChild(updateButton);

		// Create and append delete button
		let deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'btn btn-danger';
		deleteButton.onclick = function() {
			deleteWorkout(workout.id);
		};
		workoutDiv.appendChild(deleteButton);

		// view details modal
		let detailsButton = document.createElement('button');
		detailsButton.textContent = 'Details';
		detailsButton.className = 'btn btn-info';
		detailsButton.setAttribute('data-bs-toggle', 'modal');
		detailsButton.setAttribute('data-bs-target', '#workoutDetailsModal');
		detailsButton.onclick = function() { displayWorkoutDetails(workout); };
		workoutDiv.appendChild(detailsButton);


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

		// Actions (Update and Delete buttons)
		let actionsCell = document.createElement('td');
		let updateButton = document.createElement('button');
		updateButton.textContent = 'Update';
		updateButton.className = 'btn btn-primary';
		updateButton.onclick = function() {
			setupFormForUpdate(workout);
		};

		let deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'btn btn-danger';
		deleteButton.onclick = function() {
			deleteWorkout(workout.id);
		};

		actionsCell.appendChild(updateButton);
		actionsCell.appendChild(deleteButton);
		row.appendChild(actionsCell);

		tbody.appendChild(row);

		// Add detail button
		let detailsButton = document.createElement('button');
		detailsButton.textContent = 'Details';
		detailsButton.className = 'btn btn-info';
		detailsButton.setAttribute('data-bs-toggle', 'modal');
		detailsButton.setAttribute('data-bs-target', '#workoutDetailsModal');
		detailsButton.onclick = function() { displayWorkoutDetails(workout); };
		actionsCell.appendChild(detailsButton);


	}

	table.appendChild(thead);
	table.appendChild(tbody);

	// Get tableContent div and append the created table to it
	let tableContentDiv = document.getElementById('tableContent');
	tableContentDiv.textContent = ''; // Clear any previous content
	tableContentDiv.appendChild(table);
}


// Function to handle both creating and updating workouts
function submitWorkoutForm(event, workoutId) {
	event.preventDefault(); // Prevent the default form submission behavior
	console.log("Submitting workout form...");
	console.log("Workout ID:", workoutId); // Check if ID is present

	// Extracting minutes and seconds from the duration input
	const durationInput = document.getElementById('duration').value;
	const [minutes, seconds] = durationInput.split(':').map(Number); // need to split the input and convert to numbers

	let age = document.getElementById('age').value;
	storeUserAge(); // Ensure age is stored when submitting form

	// Collect data from the form
	let formData = {
		date: document.getElementById('date').value,
		type: document.getElementById('type').value,
		duration: (minutes * 60) + seconds, // Convert min and sec to total seconds
		heartRateAvg: document.getElementById('heartRateAvg').value,
		isFasted: document.getElementById('isFasted').checked,
		preWorkoutMeal: document.getElementById('preWorkoutMeal').checked,
		caffeineConsumed: document.getElementById('caffeineConsumed').checked,
		notes: document.getElementById('notes').value,
		age: age,
		intensity: calculateIntensity(age, heartRateAvg) // Calculate and include intensity
	};

	let method = workoutId ? 'PUT' : 'POST';
	// let url = '/api/workouts' + (workoutId ? '/' + workoutId : ''); old one that shows an error
	let url = workoutId ? `/api/workouts/${workoutId}` : '/api/workouts';

	console.log("Request Method:", method);
	console.log("Request URL:", url);

	submitWorkoutData(formData, method, url, function() {
		// Callback to reset form after successful submission
		resetForm();
	});
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


function submitWorkoutData(formData, method, url, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
			console.log('Workout saved successfully');
			loadWorkoutLog(); // Reload the list of workouts
			callback(); // Reset form after successful data submission
		} else {
			console.error('Failed to save workout:', xhr.responseText);
		}
	};
	xhr.send(JSON.stringify(formData));
}

function resetForm() {
	document.getElementById('newWorkoutForm').reset(); // Reset all form fields
	document.getElementById('formHeading').textContent = "Create New Workout";
	document.getElementById('submitBtn').textContent = "Create Workout";
	document.getElementById('workoutId').value = ""; // Clear the hidden workoutId value
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

// Function to setup form for new workout submission
function setupFormForCreate() {
	resetForm();
	document.getElementById('workoutId').value = "";
	clearFormFields();
	let form = document.getElementById('newWorkoutForm');
	form.onsubmit = function(event) {
		submitWorkoutForm(event, null);
	};
	document.getElementById('formHeading').textContent = "Create New Workout";
	document.getElementById('submitBtn').textContent = "Create Workout";
}

// Function to setup form for updating an existing workout
function setupFormForUpdate(workout) {
	let form = document.getElementById('newWorkoutForm');
	// Set values from the workout to update
	document.getElementById('workoutId').value = workout.id;
	document.getElementById('date').value = workout.date;
	document.getElementById('type').value = workout.type;
	document.getElementById('duration').value = formatDuration(workout.duration);
	document.getElementById('heartRateAvg').value = workout.heartRateAvg;
	document.getElementById('isFasted').checked = workout.isFasted;
	document.getElementById('preWorkoutMeal').checked = workout.preWorkoutMeal;
	document.getElementById('caffeineConsumed').checked = workout.caffeineConsumed;
	document.getElementById('notes').value = workout.notes;

	form.onsubmit = function(event) {
		submitWorkoutForm(event, workout.id); // Passing the actual workoutId for update
	};
}

// Function to clear form fields (to be used when setting up form for create)
function clearFormFields() {
	document.getElementById('workoutId').value = "";
	document.getElementById('date').value = "";
	document.getElementById('type').value = "";
	document.getElementById('duration').value = "";
	document.getElementById('heartRateAvg').value = "";
	document.getElementById('isFasted').checked = false;
	document.getElementById('preWorkoutMeal').checked = false;
	document.getElementById('caffeineConsumed').checked = false;
	document.getElementById('notes').value = "";
}

//format duration in seconds to mm:ss
function formatDuration(seconds) {
	let minutes = Math.floor(seconds / 60);
	let remainingSeconds = seconds % 60;
	if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;
	return `${minutes}:${remainingSeconds}`;
}


// Function to setup form for updating an existing workout
function setupFormForUpdate(workout) {
	// Set form values to the selected workout's details
	document.getElementById('workoutId').value = workout.id;
	document.getElementById('date').value = workout.date;
	document.getElementById('type').value = workout.type;
	document.getElementById('duration').value = formatDuration(workout.duration);
	document.getElementById('heartRateAvg').value = workout.heartRateAvg;
	document.getElementById('isFasted').checked = workout.isFasted;
	document.getElementById('preWorkoutMeal').checked = workout.preWorkoutMeal;
	document.getElementById('caffeineConsumed').checked = workout.caffeineConsumed;
	document.getElementById('notes').value = workout.notes;

	let form = document.getElementById('newWorkoutForm');
	form.onsubmit = function(event) {
		submitWorkoutForm(event, workout.id);
	};
	document.getElementById('formHeading').textContent = "Update Workout";
	document.getElementById('submitBtn').textContent = "Update Workout";
}


// Function to delete a workout
function deleteWorkout(workoutId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', '/api/workouts/' + workoutId, true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log('Workout deleted successfully');
			loadWorkoutLog(); // Reload the list of workouts to reflect the deletion
		} else {
			console.error('Failed to delete workout:', xhr.status, xhr.responseText);
		}
	};
	xhr.send();
}

function displayWorkoutDetails(workout) {
	let detailsDiv = document.getElementById('workoutDetails');
	detailsDiv.textContent = ''; // Clear previous details

	let formattedDuration = formatDuration(workout.duration); // Format duration

	let details = [
		'Date: ' + workout.date,
		'Type: ' + workout.type,
		'Duration: ' + formattedDuration,
		'Heart Rate Avg: ' + workout.heartRateAvg + ' bpm',
		'Fasted: ' + (workout.isFasted ? 'Yes' : 'No'),
		'Pre Workout Meal: ' + (workout.preWorkoutMeal ? 'Yes' : 'No'),
		'Caffeine Consumed: ' + (workout.caffeineConsumed ? 'Yes' : 'No'),
		'Notes: ' + workout.notes,
		'Intensity: ' + calculateIntensity(workout.heartRateAvg)
	];

	details.forEach(function(detail) {
		let p = document.createElement('p');
		p.textContent = detail;
		detailsDiv.appendChild(p);
	});
}

// calls function when the user inputs their age or logs in
// Set age in sessionStorage
function storeUserAge() {
	let age = document.getElementById('age').value;
	sessionStorage.setItem('userAge', age);
	console.log("Stored age:", age); // Added console log to check if age is being called
}

// Get age from sessionStorage
function getUserAge() {
	return sessionStorage.getItem('userAge');
}

function calculateIntensity(heartRateAvg) {
	let age = parseInt(getUserAge(), 10);  // Ensure age is an integer
	if (!age) {
		console.error("Age not found in sessionStorage or invalid");
		return "Intensity not available";
	}

	let maxHeartRate = 220 - age;
	let intensityLevel;

	if (heartRateAvg < maxHeartRate * 0.5) {
		intensityLevel = 'Low';
	} else if (heartRateAvg < maxHeartRate * 0.7) {
		intensityLevel = 'Moderate';
	} else if (heartRateAvg <= maxHeartRate * 0.85) {
		intensityLevel = 'Vigorous';
	} else {
		intensityLevel = 'Very Vigorous';
	}

	console.log(`Age: ${age}, Heart Rate Avg: ${heartRateAvg}, Max Heart Rate: ${maxHeartRate}, Intensity: ${intensityLevel}`);
	return intensityLevel;
}
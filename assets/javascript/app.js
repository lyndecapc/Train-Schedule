// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve train data from the database.
// 4. Create a way to calculate how many minutes away the train is

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD-LCDhGu0ydoez0zxR0IhZsNu0PZeWCxY",
    authDomain: "trainscheduler-a9d23.firebaseapp.com",
    databaseURL: "https://trainscheduler-a9d23.firebaseio.com",
    projectId: "trainscheduler-a9d23",
    storageBucket: "trainscheduler-a9d23.appspot.com",
    messagingSenderId: "650818893319",
    appId: "1:650818893319:web:b2fdcc0217e76dab479ca2"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Create a variable to reference the database
  var database = firebase.database();

  // 2. Button for adding Trains
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var nameInput = $("#train-name-input").val().trim();
  var destInput = $("#destination-input").val().trim();
  var timeInput = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var freqInput = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: nameInput,
    destination: destInput,
    time: timeInput,
    frequency: freqInput
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);


var firstTimeConverted = moment(trainTime, "X").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFreq;
console.log(tRemainder);

// Minute Until Train
var minAway = trainFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + minAway);

// Next Train
var trainArr = moment().add(minAway, "minutes");
console.log("ARRIVAL TIME: " + moment(trainArr).format("minutes"));



// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainFreq),
  $("<td>").text(trainArr),
  $("<td>").text(minAway),
);

// Append the new row to the table
$("tbody").append(newRow);

});
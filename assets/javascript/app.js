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

  // 2. Button for adding Employees
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var nameInput = $("#train-name-input").val().trim();
  var destInput = $("#destination-input").val().trim();
  var timeInput = moment($("#time-input").val().trim(), "H").format("X");
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
  console.log(newTrain.name);
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


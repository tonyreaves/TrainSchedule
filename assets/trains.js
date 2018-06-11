const database = firebase.database();

// Initial Values
let train = "";
let destination = "";
let firstTrain = 0;
let frequency = 0;

// Capture Button Click
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    train = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    const firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    const currentTime = moment();

    const diffTime = moment().diff(moment(firstTrainConverted), "minutes");

    const tRemainder = diffTime % frequency;

    const minutesTillTrain = frequency - tRemainder;

    const nextTrain = moment().add(minutesTillTrain, "minutes");

    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log("Minutes till train: " + minutesTillTrain);
    console.log("Next train " + nextTrain)

    // Code for handling the push
    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minutesTillTrain: minutesTillTrain,
        nextTrain: nextTrain,

        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

// Firebase watcher 
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val()
    const sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);

    let trainShow = [];
    let destShow = [];
    let freqShow = [];
    let nextShow = [];
    let tillShow = [];

    // Change HTML 
    $("#train-display").html(sv.train);
    $("#destination-display").push(sv.destination);
    $("#frequency-display").push(sv.frequency);
    // $("#next-arrival-display").push(sv.minutesTillTrain);
    // $("#minutes-away-display").push(sv.nextTrain);



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})
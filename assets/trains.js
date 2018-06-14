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

    const tRemainder = (diffTime % frequency);

    const minutesTillTrain = frequency - tRemainder;

    const nextCalc = (currentTime + minutesTillTrain);

    const nextTrain = moment(nextCalc).format("HH:mm");
    // console.log(train);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log("Minutes till train: " + minutesTillTrain);
    console.log("Next train " + nextTrain);

    // console.log("FREQ", frequency)
    // console.log("tRema", tRemainder)

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
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    $("#train-table").append("<tr class='table bg-secondary'><td id='train-display'>" + childSnapshot.val().train +
        " </td>"+ "<td id='destination-display'>" + childSnapshot.val().destination +
        " </td>" + "<td id='frequency-display'> " + childSnapshot.val().frequency +
        " </td>" + "<td id='next-arrival-display'> " + childSnapshot.val().nextTrain +
        " </td>" + "<td id='minutes-away-display'> " + childSnapshot.val().minutesTillTrain + " </td></tr>");

        
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})
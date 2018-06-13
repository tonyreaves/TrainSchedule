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

    const tRemainder = Number(diffTime) % Number(frequency);

    const minutesTillTrain = Number(frequency ) - Number(tRemainder);

    const nextTrain = moment().add(minutesTillTrain, "m");
    // console.log(train);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log("Minutes till train: " + minutesTillTrain);
    console.log("Next train " + nextTrain)

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
    // storing the snapshot.val()
    // const sv = childSnapshot.val();

    // // Console.loging the last user's data
    // console.log(sv.train);
    // console.log(sv.destination);
    // console.log(sv.firstTrain);
    // console.log(sv.frequency);

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().minutesTillTrain);

    $("#train-table").append("<div class='table bg-secondary'><id='train-display'><span class='train'>" + childSnapshot.val().train +
        " </input>"+ "<id='destination-display'><span class='destination'>" + childSnapshot.val().destination +
        " </span><span class='frequency'> " + childSnapshot.val().frequency +
        " </span><span class='away'> " + childSnapshot.val().minutesTillTrain + " </span></div>");

// Change HTML 
// $("#train-display").html(trainShow);
// $("#destination-display").html(destShow);
// $("#frequency-display").html(freqShow);
// $("#next-arrival-display").html(nextShow);
// $("#minutes-away-display").html(tillShow);



    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})
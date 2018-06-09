var database = firebase.database();

    // Initial Values
    var train = "";
    var destination = "";
    let firstTrain = 0;
    var frequency = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      train = $("#name-input").val().trim();
      destination = $("#email-input").val().trim();
      firstTrain = $("#age-input").val().trim();
      frequency = $("#comment-input").val().trim();

      // Code for handling the push
      database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.train);
      console.log(sv.destination);
      console.log(sv.firstTrain);
      console.log(sv.frequency);

      // Change the HTML to reflect
      $("#name-display").text(sv.name);
      $("#email-display").text(sv.email);
      $("#age-display").text(sv.age);
      $("#comment-display").text(sv.comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    })
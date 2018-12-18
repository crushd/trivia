function getQuestion() {

    // Get a random question
    var queryURL = "https://opentdb.com/api.php?amount=1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //var questionArray = response;

        console.log(response.results[0].question);
        $("#triviaQuestion").html(response.results[0].question);

        var answerList = [];
        answerList.push(response.results[0].correct_answer);
        answerList.push(response.results[0].incorrect_answers);
        console.log("Answers: " + answerList);
    });

}

getQuestion();
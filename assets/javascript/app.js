// get a random number between a minimum and maximum value
function getRandomNumber(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getQuestion() {

    // Get a random question
    var queryURL = "https://opentdb.com/api.php?amount=1&type=multiple";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //var questionArray = response;

        //console.log(response.results[0].question);
        $("#triviaQuestion").html(response.results[0].question);

        var answerList = [];

        var incorrectAnswers = response.results[0].incorrect_answers;

        for (i=0;i<incorrectAnswers.length;i++) {
            answerList.push(incorrectAnswers[i]);
        }

        var correctAnswer = response.results[0].correct_answer;
        answerList.splice(getRandomNumber(0,answerList.length),0,correctAnswer);

        $("#answer1").html(answerList[0]);
        $("#answer2").html(answerList[1]);
        $("#answer3").html(answerList[2]);
        $("#answer4").html(answerList[3]);

        console.log("Answers: " + answerList + ". Correct: " + correctAnswer);
    });

}

getQuestion();
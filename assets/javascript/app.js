

var answerList = []; // set up a blank array to hold all of the answer choices
var correctAnswer;   // declare the correctAnswer variable;
var isCorrect;
var newGameTimer = 10;
var gameTimer = newGameTimer;
var nextQuestionTimer = 5;
var correctCount = 0;
var incorrectCount = 0;

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

        // update the question dom on the home page
        $("#triviaQuestion").html(response.results[0].question);

        // set the incorrect answers to a variable
        var incorrectAnswers = response.results[0].incorrect_answers;

        // loop through the incorrect answers and push them into the answerList array
        for (i=0;i<incorrectAnswers.length;i++) {
            answerList.push(incorrectAnswers[i]);
        }

        // set the correct answer to a variable
        correctAnswer = response.results[0].correct_answer;

        // shove that variable in some random spot in the answerList array
        answerList.splice(getRandomNumber(0,answerList.length),0,correctAnswer);

        // update the answer dom block on the front page
        $("#answer1").html(answerList[0]);
        $("#answer2").html(answerList[1]);
        $("#answer3").html(answerList[2]);
        $("#answer4").html(answerList[3]);

        //console.log("Answers: " + answerList + ". Correct: " + correctAnswer);
        console.log("Good luck.");

        // start the clock
        startTimer();

    });

    

}

function startTimer() {
    answerTimer = setInterval(function() {
        $("#gameTimer").text(gameTimer);
        gameTimer--;

        if (gameTimer < 0) {
            clearInterval(answerTimer);
            $("#gameTimer").text("Time's up!");
            gameTimer = newGameTimer;
            timesUp();
        }

    },1000);
}

function timesUp() {
    console.log("Time is up!");
    
    // time is up.
    // display correct answer countdown seconds.
    // run getQuestion() for a new try
    nextQuestion();
}

function nextQuestion() {
    nextQuestionTimer = newGameTimer;

    nextQuestionDelay = setInterval(function() {
        
        $("#gameTimer").text("Get ready, next question in " + nextQuestionTimer + "...");
        nextQuestionTimer--;

        if (nextQuestionTimer === 0) {
            clearInterval(nextQuestionDelay);
            getQuestion();
        }

    },1000);


}

function checkAnswer(answer) {
    // code to match the user's answer to the correctAnswer variable.

    if (answer === correctAnswer) {
        isCorrect = true;
        
    } else {
        isCorrect = false;
        
    }

    //console.log(isCorrect);

}


$(document).ready(function() {

    getQuestion();

    $("#answer1").on("click", function() {
        //console.log(answerList[0]);
        checkAnswer(answerList[0]);
        
        if (isCorrect) {
            $(this).addClass( "correct" );
        } else {
            $(this).addClass( "incorrect" );
        }

    });

    $("#answer2").on("click", function() {
        //console.log(answerList[1]);
        checkAnswer(answerList[1]);
        
        if (isCorrect) {
            $(this).addClass( "correct" );
        } else {
            $(this).addClass( "incorrect" );
        }
    });

    $("#answer3").on("click", function() {
        //console.log(answerList[2]);
        checkAnswer(answerList[2]);
        
        if (isCorrect) {
            $(this).addClass( "correct" );
        } else {
            $(this).addClass( "incorrect" );
        }
    });

    $("#answer4").on("click", function() {
        //console.log(answerList[3]);
        checkAnswer(answerList[3]);
        
        if (isCorrect) {
            $(this).addClass( "correct" );
        } else {
            $(this).addClass( "incorrect" );
        }
    });

})
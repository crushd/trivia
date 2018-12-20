

var answerList = []; // set up a blank array to hold all of the answer choices
var correctAnswer;   // declare the correctAnswer variable;
var isCorrect;
var newGameTimer = 8;
var newNextQuestionTimer = 3;

var maxQuestions = 3;
var questionCount = 0;

var gameTimer = newGameTimer;
var nextQuestionTimer = newNextQuestionTimer;

var correctCount = 0;
var incorrectCount = 0;

// get a random number between a minimum and maximum value
function getRandomNumber(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getImage(q){
 
    var imgQueryUrl = "https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI?autoCorrect=true&count=1&q=" + q;

    $.ajax({
        url: imgQueryUrl,
        method: "GET",
        headers: {"X-Mashape-Key": "s8OGlGrWuNmshWm627QaDWgwEgGvp1TRVR4jsnUsKk9hud3VpK"}
    }).then(function(response) {
    
        console.log(response.value[0].url);
        //$("#question-image").createElement("<img>");
        $("#question-image").html("<img src=" + response.value[0].url + " width='50%' />")

    });
}

function getQuestion() {

    questionCount++;
    console.log(questionCount + " of " + maxQuestions + " questions.");

    answerList = [];

    $("#answerStatus").text("");
    $("#answerResult").text("");
    $("#triviaQuestion").text("Loading...");
    $("#play-again").hide();
    $("#answer1").removeClass("correct incorrect").text("Loading...");
    $("#answer2").removeClass("correct incorrect").text("Loading...");
    $("#answer3").removeClass("correct incorrect").text("Loading...");
    $("#answer4").removeClass("correct incorrect").text("Loading...");
    $("#answersContainer").show();
    $("#question-image").empty();

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
        for (j = 0 ; j < answerList.length ; j++) {
            $("#answer" + (j+1)).html(answerList[j]);
        }       

        // start the clock
        startTimer();

        return answerList;

    });


}

function startTimer() {

    gameTimer = newGameTimer;

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
    console.log("Time's up!");
    
    // time is up.
    // display correct answer countdown seconds.
    // run getQuestion() for a new try
    
    $("#answersContainer").hide();
    checkAnswer();
}

function gameOver() {
        $("#gameTimer").text("Game over!");
        $('#final-results').show();
        $('#play-again').show();
        
        $('#totalCorrect').text("Correct: " + correctCount);
        $('#totalIncorrect').text("Incorrect: " + incorrectCount);
}

function nextQuestion() {
    
    // if (questionCount === maxQuestions) {
    //     console.log("Game over");
    // }

    nextQuestionTimer = newNextQuestionTimer;
    //clearInterval(answerTimer);

    nextQuestionDelay = setInterval(function() {
        
        $("#gameTimer").text("Next question in " + nextQuestionTimer + "...");
        nextQuestionTimer--;

        if (nextQuestionTimer < 0) {
            clearInterval(nextQuestionDelay);
            getQuestion();
        }

    },1000);

}

function checkAnswer(answer) {
    // code to match the user's answer to the correctAnswer variable.

    $("#question-image").show();
    if (answer === correctAnswer) {
            
        clearInterval(answerTimer);

        isCorrect = true;
        correctCount++;
        $("#totalCorrect").text("Correct: " + correctCount);
        $("#totalIncorrect").text("Incorrect: " + incorrectCount);


        console.log("Correct: " + correctCount);
        console.log("Incorrect: " + incorrectCount);

        $("#answerStatus").text("Nice work, that's correct!");
        $("#answerResult").html(correctAnswer);
        $("#answersContainer").hide();
        
        if (questionCount < maxQuestions) {
            nextQuestion();
        } else {
            console.log("game over");
            gameOver();
        }

    } else {

        clearInterval(answerTimer);

        isCorrect = false;
        incorrectCount++;
        $("#totalCorrect").text("Correct: " + correctCount);
        $("#totalIncorrect").text("Incorrect: " + incorrectCount);

        console.log("Correct: " + correctCount);
        console.log("Incorrect: " + incorrectCount);

        if (answer == null) {
            $("#answerStatus").text("You ran out of time.");
        } else {
            $("#answerStatus").text("Sorry, that isn't correct");
        }
        
        if (questionCount < maxQuestions) {
            nextQuestion();
        } else {
            console.log("game over");
            gameOver();
        }
        
        $("#answersContainer").hide();
        $("#answerResult").html("The correct answer is " + correctAnswer);

    }

}
$("#play-again").on("click", function() {
    console.log("play again");
    location.reload();
})

$(document).ready(function() {

    getQuestion();

    // console.log(answerList);
    // console.log("Array Length: " + answerList.length);

    // for (k = 0 ; k < answerList.length ; k++) {
        
    //     console.log(answerList[k]);

    //     $("#answer" + (k+1)).on("click", function() {
    //         //console.log(answerList[k]);
    //         checkAnswer(answerList[k]);
    
    //         if (isCorrect) {
    //             $(this).addClass( "correct" );
    //         } else {
    //             $(this).addClass( "incorrect" );
    //         }
    
    
    //     });

    // }


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
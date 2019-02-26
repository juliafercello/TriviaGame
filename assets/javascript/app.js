var triviaGame = {
    correct: 0,
    incorrect: 0,
    missed: 0,
    questionIndex: 0,
    answerTimeout: 0,
    answerInterval: 0,
    theClock: 10,
    questions: [{
        question: "Where are Brandon and Brenda Walsh from?",
        choices: ["Minnesota", "Wisconsin", "North Carolina", "Utah"],
        answer: "Minnesota"
    }, {
        question: "Who got married in the series finale?",
        choices: ["Brenda and Dylan", "Brandon and Kelly", "Kelly and Dylan", "David and Donna"],
        answer: "David and Donna"
    }, {
        question: "Where did Brandon work in high school?",
        choices: ["The Library", "The Peach Pit", "The Max", "Starbucks"],
        answer: "The Peach Pit"
    }, {
        question: "Whose parents got married?",
        choices: ["Dylan's Dad and Kelly's Mom", "Donna's Mom and Brandon's Dad", "David's Dad and Kelly's Mom", "Brenda's Mom and Brandon's Dad"],
        answer: "David's Dad and Kelly's Mom"
    }, {
        question: "Which character almost didn't get to graduate?",
        choices: ["Dylan", "Donna", "David", "Steve"],
        answer: "Donna"
    }, {
        question: "Who used their grandmother's address to be able to go to West Beverly High?",
        choices: ["Kelly", "Brenda", "Andrea", "Valerie"],
        answer: "Andrea"
    }, {
        question: "What was Dylan's Mom's name?",
        choices: ["Iris", "Cindy", "Samantha", "Felice"],
        answer: "Felice"
    }, {
        question: "What kind of car did Steve drive?",
        choices: ["Jeep", "Corvette", "Chevy Truck", "Minivan"],
        answer: "Corvette"
    }
    ],

    startTheGame: function () {
        triviaGame.theClock = 10; 
        triviaGame.questionIndex = 0;
        $(".startGame").remove();
        $("#helpText").remove();
        triviaGame.nextQuestion();
    },

    nextQuestion: function () {
        //Hide the modal if open and remove previous answers 
        $("#showAnswerModal").modal('hide');
        $(".guess").remove();
        triviaGame.theClock = 10; 
 
        //Display the question
        $("#showTimer").text("Time left: " + triviaGame.theClock);
        $("#theQuestion").text(triviaGame.questions[triviaGame.questionIndex].question);
        //Display the answers
        for (var i = 0; i < triviaGame.questions[triviaGame.questionIndex].choices.length; i++) {
            var choice = $("<a>").text(triviaGame.questions[triviaGame.questionIndex].choices[i]);
            choice.attr("class", "btn btn-info m-2 text-white guess");
            choice.attr("data-guess", triviaGame.questions[triviaGame.questionIndex].choices[i])
            choice.appendTo($("#questionDiv"));
        }

        //User has 10 seconds to answer the question
        var missed = "missed";
        triviaGame.answerTimeout = setTimeout(triviaGame.showTheAnswer, 10000, missed);
        triviaGame.answerInterval = setInterval(triviaGame.countdown, 1000); 
       
        //Wait for their guess
        $(".guess").on("click", function () {
            clearTimeout(triviaGame.answerTimeout);
            clearInterval(triviaGame.answerInterval);
            var theirAnswer = $(this).attr("data-guess");
            //console.log(theirAnswer); 
            triviaGame.checkTheAnswer(theirAnswer);
        });
    },

    countdown: function() {
        triviaGame.theClock--; 
       // console.log("current Time: "+ triviaGame.theClock)
        $("#showTimer").text("Time left: " + triviaGame.theClock);
    },

    //Check to see if the user guessed correctly or not    
    checkTheAnswer: function (guess) {
        //console.log(guess);
        var answer = "";
        if (guess === triviaGame.questions[triviaGame.questionIndex].answer) {
            triviaGame.correct++;
            $("#showAnswer").text("You know your stuff!!");
            answer = "correct";
        }
        else {
            triviaGame.incorrect++;
            $("#showAnswer").text("Nope! Did you even watch?!?");
            answer = "incorrect";
        }
        triviaGame.showTheAnswer(answer);
    },

    //Show the answer to the user and messaging for if they were right, wrong or missed the question
    showTheAnswer: function(message) {
        clearInterval(triviaGame.answerInterval);
        if (message === "missed") {
            triviaGame.missed++;
            $("#showAnswer").text("You ran out of time!");
        }
        $("#answerInfo").text("The answer is: " + triviaGame.questions[triviaGame.questionIndex].answer);
        $("#showAnswerModal").modal('show');
        triviaGame.questionIndex++;
        var nextQuestion = setTimeout(triviaGame.nextQuestion, 3000);
    }

}

//Play the Game!!
$(document).ready(function () {
    $(".startGame").on("click", function () {
        triviaGame.startTheGame();
    });
});
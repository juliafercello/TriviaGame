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
        answer: "Minnesota",
        image: "assets/images/bbwalsh.jpg"
    }, {
        question: "Who got married in the series finale?",
        choices: ["Brenda and Dylan", "Brandon and Kelly", "Kelly and Dylan", "David and Donna"],
        answer: "David and Donna",
        image: "assets/images/wedding.jpg"
    }, {
        question: "Where did Brandon work in high school?",
        choices: ["The Library", "The Peach Pit", "The Max", "Starbucks"],
        answer: "The Peach Pit",       
        image: "assets/images/peachpit.jpg"
    }, {
        question: "Whose parents got married?",
        choices: ["Dylan's Dad and Kelly's Mom", "Donna's Mom and Brandon's Dad", "David's Dad and Kelly's Mom", "Brenda's Mom and Brandon's Dad"],
        answer: "David's Dad and Kelly's Mom",
        image: "assets/images/parentswed.png"
    }, {
        question: "Which character almost didn't get to graduate?",
        choices: ["Dylan", "Donna", "David", "Steve"],
        answer: "Donna",
        image: "assets/images/donnagraduates.jpg"
    }, {
        question: "Who used their grandmother's address to be able to go to West Beverly High?",
        choices: ["Kelly", "Brenda", "Andrea", "Valerie"],
        answer: "Andrea",
        image: "assets/images/andrea.jpeg"
    }, {
        question: "What was Dylan's Mom's name?",
        choices: ["Iris", "Cindy", "Samantha", "Felice"],
        answer: "Iris",
        image: "assets/images/iris.jpg"
    }, {
        question: "What kind of car did Steve drive?",
        choices: ["Jeep", "Corvette", "Chevy Truck", "Minivan"],
        answer: "Corvette",
        image: "assets/images/car.jpg"
    }
    ],

    startTheGame: function () {
        triviaGame.theClock = 10; 
        triviaGame.questionIndex = 0;
        triviaGame.correct = 0;
        triviaGame.incorrect = 0;
        triviaGame.missed = 0;
        $(".startGame").remove();
        $("#helpText").remove();
        $("#gameOverDiv").empty();
        triviaGame.nextQuestion();
    },

    //Ask a question
    nextQuestion: function () {
        //Hide the modal if open and remove previous answers 
        $("#showAnswerModal").modal('hide');
        $(".guess").remove();
        triviaGame.theClock = 10; 
        
        //Check to see if the game is over 
        if (triviaGame.questionIndex < triviaGame.questions.length) {
                
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
            }
            
        else {
            triviaGame.gameOver(); 
        }
    },

    //Show a timer of the time remaining
    countdown: function() {
        triviaGame.theClock--; 
       // console.log("current Time: "+ triviaGame.theClock)
        $("#showTimer").text("Time left: " + triviaGame.theClock);
    },

    //Check to see if the user guessed correctly or not    
    checkTheAnswer: function (guess) {
        //console.log(guess);
        var answerMessage = "";
        if (guess === triviaGame.questions[triviaGame.questionIndex].answer) {
            triviaGame.correct++;
            $("#showAnswer").text("Yay! You're right!!");
            answerMessage = "correct";
        }
        else {
            triviaGame.incorrect++;
            $("#showAnswer").text("Wrong!!");
            answerMessage = "incorrect";
        }
        triviaGame.showTheAnswer(answerMessage);
    },

    //Show the answer to the user and messaging for if they were right, wrong or missed the question
    showTheAnswer: function(message) {
        clearInterval(triviaGame.answerInterval);
        if (message === "missed") {
            triviaGame.missed++;
            $("#showAnswer").text("Time's Up!");
        }
        $("#answerInfo").text("Answer: " + triviaGame.questions[triviaGame.questionIndex].answer);
        $("#answerPic").attr("src", triviaGame.questions[triviaGame.questionIndex].image);
        $("#showAnswerModal").modal('show');
        triviaGame.questionIndex++;
        var nextQuestion = setTimeout(triviaGame.nextQuestion, 3000);
    },

    //game over
    gameOver: function() {
        $("#showTimer").empty();
        $("#theQuestion").empty();

        var gameOver = $("<h5>").addClass("card-title text-body").text("Game Over!");
        gameOver.appendTo($("#gameOverDiv"));

        var showScore = $("<h5>").addClass("card-title text-body").html("Your Score: " + triviaGame.correct + "<br><br>" + "Wrong: " + triviaGame.incorrect + "<br>" + "Missed: " + triviaGame.missed)
        showScore.appendTo($("#gameOverDiv"));

        var reset = $("<a>").text("Play again");
        reset.attr("class", "btn btn-info m-2 text-white reset");
        reset.appendTo($("#gameOverDiv"));
    }
    
}

//Play the Game!!
$(document).ready(function () {
    $(".startGame").on("click", function () {
        triviaGame.startTheGame();
    });
});

$(document).on("click", ".reset", triviaGame.startTheGame);

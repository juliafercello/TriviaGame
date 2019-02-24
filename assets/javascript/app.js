var triviaGame = {
    correct: 0,
    incorrect: 0,
    missed: 0,
    questionIndex: 0,
    questions: [{ question: "Where are Brandon and Brenda Walsh from?", 
        choices: ["Minnesota", "Wisconsin", "North Carolina", "Utah"], answer: "Minnesota"} , 
        { question: "Who got married in the series finale?", 
        choices: ["Brenda and Dylan", "Brandon and Kelly", "Kelly and Dylan", "David and Donna"], answer: "David and Donna" } , {
            question: "Where did Brandon work in high school?", choices: ["The Library", "The Peach Pit", "The Max"], answer: "The Peach Pit"
        }],

    startTheGame: function() {
        triviaGame.questionIndex = 0; 
        $(".startGame").remove(); 
        $("#helpText").remove();
        //triviaGame.startTheTimer();  
        triviaGame.nextQuestion(); 
    },

    nextQuestion: function() {
        //Hide the modal if open and remove previous answers 
        $("#showAnswerModal").modal('hide'); 
        $(".guess").remove(); 

        //Display the question
        $("#theQuestion").text(triviaGame.questions[triviaGame.questionIndex].question); 
        //Display the answers
        for (var i=0; i < triviaGame.questions[triviaGame.questionIndex].choices.length; i++) {        
            var choice = $("<a>").text(triviaGame.questions[triviaGame.questionIndex].choices[i]); 
            choice.attr("class", "btn btn-info m-2 text-white guess");
            choice.attr("data-guess", triviaGame.questions[triviaGame.questionIndex].choices[i])
            choice.appendTo($("#questionDiv"));    
             }

        //Wait for their guess
        $(".guess").on("click", function() {
            var theirAnswer = $(this).attr("data-guess"); 
            console.log(theirAnswer); 
            triviaGame.checkTheAnswer(theirAnswer); 
        }); 
    },

    checkTheAnswer: function(guess) {
        console.log(guess);
            if (guess === triviaGame.questions[triviaGame.questionIndex].answer) {
                triviaGame.correct++;
                $("#showAnswer").text("You know your stuff!!");
            }
            else {
                triviaGame.incorrect++; 
                $("#showAnswer").text("WRONG!");
            }
            triviaGame.questionIndex++; 
            $("#showAnswerModal").modal('show'); 
            var nextQuestion = setTimeout(triviaGame.nextQuestion, 3000);
        },
    
    showAnswer: function(message) {
    }
    
 //startTheTimer: function() {
 //   var timer = setInterval(triviaGame.nextQuestion, 2000)   
//}

}
   //when the user clicks start,
        //need to show the first question
        //set an interval
        //present the choices as buttons
        
        //when the user clicks a button
            //stop the timer
            //check the answer
            //show a message of yes or no and the right answer
            //set a timer that moves to the next question
            //when no answer, show the right answer and set a time that moves to the next question

        //last question
        //show the scores and restart button and shows the first question again...


//Play the Game!!
$(document).ready(function() {
    $(".startGame").on("click", function() {
        triviaGame.startTheGame();
    }); 
});
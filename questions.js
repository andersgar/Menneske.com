human = false;



function noScroll() {
    window.scrollTo(0, 0);
}

window.addEventListener('scroll', noScroll);


$(function() {
    // var audio = new Audio("alarm.mp3");
    // audio.play();
    $('.pop-up').hide();
    $('.pop-up').fadeIn(500);
});


function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>resultat</h1>";
    gameOverHTML += "<h2 id='score'> du er: " + (quiz.score  * (90 / questions.length ) + Math.random(10)) +"% prosent menneske</h2>";
    if(quiz.score > (questions.length / 2)){
        human = true;
        gameOverHTML += "<h1>Velkommen</h1>";
        setTimeout(function(){
        $('.pop-up').fadeOut(500);
        document.getElementById("overlay").classList.remove("blur");
        window.removeEventListener('scroll', noScroll);
        audio.pause();
    }, 5000);
    }
    else if(quiz.score < (questions.length / 2)){
        gameOverHTML += "<h1>stikk av</h1>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("Er du et Menneske?", ["Ja", "Nei", "kanskje", "Nei!!! æssssjjj"], "Ja"),
    new Question("Helt sikker?", ["jaaa!","Nei", "Ok jeg tilstår, ikke egentlig :'(", "jepp forstatt menneske"], "jaaa!"),
    new Question("Tror vennene dine du er et menneske?", ["Nei, absulutt ikke", "Mest sannsynelig ikke, --jeg er for smart til å være menneske", "blurgghhh", "Ja"], "Ja"),
    new Question("Hva er 3198 * 19673", ["62914254", "Rundt 60 000 000", "Ikke ydmyke meg med så enkle beregninger.", "Mye?"], "Mye?")
];
//  new Question("spørsmål", ["", "","", ""], "svar"),

var quiz = new Quiz(questions);

populate();
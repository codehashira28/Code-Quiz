var q1 = document.querySelector(".question-1");
var submitbtn = document.querySelector(".submit");
// Start Quiz and clear intro page

var startbtn = document.querySelector('.intro button');
startbtn.addEventListener("click", function() {
    var intro = document.querySelector(".intro");
    intro.style.display = "none";
    q1.style.display = "block";
});


function selectAnswer(event) {
    var questionNumber = Number(event.target.parentElement.id[event.target.parentElement.id.length-1]);
    if(questionNumber < 5) {
        var nextQuestion = questionNumber + 1;
        document.querySelector('.question-' + questionNumber).style.display = "none";
        document.querySelector('.question-' + nextQuestion).style.display = "block";
        if(event.target.className == "correct") {
            document.querySelector("#status-" + questionNumber).textContent = "Correct!";
        } else {
            document.querySelector("#status-" + questionNumber).textContent = "Inorrect!";
        }
    } else {
        if(event.target.className == "correct") {
            document.querySelector("#status-5").textContent = "Correct!";
        } else {
            document.querySelector("#status-5").textContent = "Inorrect!";
        }
        document.querySelector(".question-5").style.display = "none";
        document.querySelector(".results").style.display = "block";
    }
    
}

var answers = document.querySelectorAll('span');
for(let i = 0; i < answers.length; ++i) {
    answers[i].addEventListener("click", selectAnswer);
}

function showScores(event) {
    document.querySelector(".results").style.display = "none";
    document.querySelector('.highscores').style.display = "block";
}

submitbtn.addEventListener('click', showScores);

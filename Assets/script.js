var q1 = document.querySelector(".question-1");

// Start Quiz and clear intro page

var startbtn = document.querySelector('.intro button');
startbtn.addEventListener("click", function() {
    var intro = document.querySelector(".intro");
    intro.style.display = "none";
    q1.style.display = "block";
});


function selectAnswer(event) {
    var questionNumber = Number(event.target.parentElement.id[event.target.parentElement.id.length-1]);
    var nextQuestion = questionNumber + 1;
    
    document.querySelector('.question-' + questionNumber).style.display = "none";
    document.querySelector('.question-' + nextQuestion).style.display = "block";
    if(event.target.className == "correct") {
        document.querySelector("#status-" + questionNumber).textContent = "Correct!";
    } else {
        document.querySelector("#status-" + questionNumber).textContent = "Inorrect!";
    }
}

var answers = document.querySelectorAll('span');
for(let i = 0; i < answers.length; ++i) {
    answers[i].addEventListener("click", selectAnswer);
}

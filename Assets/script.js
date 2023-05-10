var q1 = document.querySelector(".question-1");
var submitbtn = document.querySelector(".submit");
var clearscoresbtn = document.querySelector('.clear-score');
var time = 20;
document.querySelector('#timer').textContent = "Time: " + time;
// Start Quiz and clear intro page

var clock;

var startbtn = document.querySelector('.intro button');
startbtn.addEventListener("click", function() {
    var intro = document.querySelector(".intro");
    intro.style.display = "none";
    q1.style.display = "block";
    clock = setInterval(function() {
        --time; 
        document.querySelector('#timer').textContent = "Time: " + time;
        if(time <= 0) {
            document.querySelector('#timer').textContent = "Time: " + 0;
            time = 0;
            clearInterval(clock);
            document.querySelectorAll('main > section').forEach(function(section){
                section.style.display = "none";
            });
            document.querySelector('.results').style.display = "block";
            document.querySelector(".results p").textContent += " " + time;
        }
        }, 1000);
});

function showStatus(event, questionNumber) {
if(event.target.className == "correct") {
  document.querySelector("#status-" + questionNumber).textContent = "Correct!";
  setInterval(function() {document.querySelector("#status-" + questionNumber).textContent = ""}, 1000);
  } else {
  time-=10;
  if(time <= 0) {
    document.querySelector('#timer').textContent = "Time: " + 0;
    clearInterval(clock);
    time = 0;
    var nextQuestion = questionNumber + 1;
    document.querySelector('.question-' + nextQuestion).style.display = "none";
    document.querySelector('.results').style.display = "block";
    document.querySelector(".results p").textContent += " " + 0;
    document.querySelector("#status-" + 5).textContent = "Inorrect!";
    setInterval(function() {document.querySelector("#status-" + 5).textContent = ""}, 1000);
  } else {
    document.querySelector('#timer').textContent = "Time: " + time;
  }
  
  document.querySelector("#status-" + questionNumber).textContent = "Inorrect!";
  setInterval(function() {document.querySelector("#status-" + questionNumber).textContent = ""}, 1000);
  }
}


function selectAnswer(event) {
    var questionNumber = Number(event.target.parentElement.id[event.target.parentElement.id.length-1]);
    if(questionNumber < 5) {
        var nextQuestion = questionNumber + 1;
        document.querySelector('.question-' + questionNumber).style.display = "none";
        document.querySelector('.question-' + nextQuestion).style.display = "block";
        showStatus(event, questionNumber);  
    } else {
        showStatus(event, 5);  
        document.querySelector(".question-5").style.display = "none";
        document.querySelector(".results").style.display = "block";
        clearInterval(clock);
        document.querySelector(".results p").textContent += " " + time;
    }
   
}

var answers = document.querySelectorAll('span');
for(let i = 0; i < answers.length; ++i) {
    answers[i].addEventListener("click", selectAnswer);
}

function showScores(event) {
    document.querySelector(".results").style.display = "none";
    document.querySelector('.highscores').style.display = "block";
    localStorage.setItem(document.querySelector('#name').value, time);
}

function clearScores() {
    localStorage.clear();
}


submitbtn.addEventListener('click', showScores);
clearscoresbtn.addEventListener('click', clearScores);

var q1 = document.querySelector(".question-1");
var submitbtn = document.querySelector(".submit");
var clearscoresbtn = document.querySelector('.clear-score');
var time = 70;
document.querySelector('#timer').textContent = "Time: " + time;
var scorelist = document.querySelector('.score-list');
var viewscores = document.querySelector('#view-scores');


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
            document.querySelector(".results p").textContent = "Your final socre is " + time;
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
    document.querySelectorAll('main > section').forEach(function(section){
        section.style.display = "none";
    });
    document.querySelector('.results').style.display = "block";
    document.querySelector(".results p").textContent = "Your final socre is " + 0;
    document.querySelector("#status-" + 5).textContent = "Inorrect!";
    setInterval(function() {document.querySelector("#status-" + 5).textContent = ""}, 1000);
  } else {
    document.querySelector('#timer').textContent = "Time: " + time;
  }
  
  document.querySelector("#status-" + questionNumber).textContent = "Inorrect!";
  setInterval(function() {document.querySelector("#status-" + questionNumber).textContent = ""}, 1000);
  }
}


function selectAnswer(event) { //fix this
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
        document.querySelector(".results p").textContent = "Your final socre is " + time;
    }
   
}

var answers = document.querySelectorAll('span');
for(let i = 0; i < answers.length; ++i) {
    answers[i].addEventListener("click", selectAnswer);
}

function showScores(event) {
    document.querySelector(".results").style.display = "none";
    document.querySelector('#highscores').style.display = "block";
    viewscores.disabled = true;
    var key = document.querySelector('#name').value;
    localStorage.setItem(key, time);
    var names = sortStorage();
    displayStorage(names);
}

function displayStorage(names) {
    for(var i = names.length-1; i >= 0; --i) {
        var entry = document.createElement('li');
        var person = names[i];
        var score = Number(localStorage.getItem(names[i]));
        entry.textContent = person + ' - ' + score;
        scorelist.appendChild(entry);
    }  
}

function sortStorage() {
    var scores = [];
    var names = [];
    for(var i = 0; i < localStorage.length; ++i) {
        scores.push(Number(localStorage.getItem(localStorage.key(i))));
    }
    scores.sort((a, b) => a - b); // got this piece of code from https://dmitripavlutin.com/javascript-array-sort-numbers/ to sort array numerically

    for(var i = 0; i < scores.length; ++i) {
        for(var j = 0; j < localStorage.length; ++j) {
            if(localStorage.getItem(localStorage.key(j)) == scores[i]) {
                if(!names.includes(localStorage.key(j))) {
                    names.push(localStorage.key(j));
                }
            }
        }
    }

    return names;

}

function clearScores() {
    localStorage.clear();
    scorelist.textContent = "";
}

function viewScoreList() {
    document.querySelectorAll('main > section').forEach(function(section){
        section.style.display = "none";
    });
    var names = sortStorage();
    displayStorage(names);
    document.querySelector('#highscores').style.display = "block";
    viewscores.disabled = true;
}


submitbtn.addEventListener('click', showScores);
clearscoresbtn.addEventListener('click', clearScores);
viewscores.addEventListener('click', viewScoreList);
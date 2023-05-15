var q1 = document.querySelector(".question-1");
var submitbtn = document.querySelector(".submit");
var clearscoresbtn = document.querySelector('.clear-score');
var time = 50;
document.querySelector('#timer').textContent = "Time: " + time;
var scorelist = document.querySelector('.score-list');
var viewscores = document.querySelector('#view-scores');
var clock;

// Start Quiz and clear intro page. Display the first question and start timer.
// Conditions put in place that if timer hits zero or below zero, set time back to zero and display the results page with score of 0.


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

//function that runs in response to selected answers. Program will display "Correct!" if user gets the answer right.
//If the user selects an incorrect answer, the program will display "Incorrect!" and deduct 10 seconds from timer.

function showStatus(event, questionNumber) {
if(event.target.className == "correct") {
  document.querySelector("#status-" + questionNumber).textContent = "Correct!";
  document.querySelector("#status-" + questionNumber).style.color = "green";
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
    document.querySelector("#status-" + 5).style.color = "red";
    setInterval(function() {document.querySelector("#status-" + 5).textContent = ""}, 1000);
  } else {
    document.querySelector('#timer').textContent = "Time: " + time;
  }
  
  document.querySelector("#status-" + questionNumber).textContent = "Inorrect!";
  document.querySelector("#status-" + questionNumber).style.color = "red";
  setInterval(function() {document.querySelector("#status-" + questionNumber).textContent = ""}, 1000);
  }
}

//function that responds to user selected answer of current question and proceeds to the next question or to the results page if the last question was answered.
//function will also show whether the answer was correct or incorrect from 'showStatus' function.

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
        document.querySelector(".results p").textContent = "Your final socre is " + time;
    }
   
}

// adds the capability of all multiple choice answers to be selectable and run the 'selectAnswer' function

var answers = document.querySelectorAll('span');
for(let i = 0; i < answers.length; ++i) {
    answers[i].addEventListener("click", selectAnswer);
}

//once the user inputs their initials and submits, the highscores page will render and show the high scores of all participants in order of highest scores.

function showScores(event) {
    document.querySelector(".results").style.display = "none";
    document.querySelector('#highscores').style.display = "block";
    viewscores.disabled = true;
    var key = document.querySelector('#name').value;
    localStorage.setItem(key, time);
    var names = sortStorage();
    displayStorage(names);
}

//function that displays the scores of the participants in an ordered list.

function displayStorage(names) {
    for(var i = names.length-1; i >= 0; --i) {
        var entry = document.createElement('li');
        var person = names[i];
        var score = Number(localStorage.getItem(names[i]));
        entry.textContent = person + ' - ' + score;
        scorelist.appendChild(entry);
    }  
}

//function that takes the scores of participants in the localStorage and orders them by highest score.
//the scores were put in an array and sorted (sort code taken from online source) and then matched back to their respective users.
//the names were then placed in a separate array in the sorted order based on scores and then rendered to the highscores list.


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

//function to clear all of the scores from storage and highscores list reset.

function clearScores() {
    localStorage.clear();
    scorelist.textContent = "";
}

//function that allows the user to see the highscores list at any time. 
//all questions displays had to be set to none and then render the highscores page.
//the 'View High Scores' button had to be set to disabled when viewing the high scores list to avoid double printing scores.

function viewScoreList() {
    document.querySelectorAll('main > section').forEach(function(section){
        section.style.display = "none";
    });
    var names = sortStorage();
    displayStorage(names);
    document.querySelector('#highscores').style.display = "block";
    viewscores.disabled = true;
}

//event listeners were added to the submit button for submitting participant scores, clearing the scores list, and viewing the scores page.

submitbtn.addEventListener('click', showScores);
clearscoresbtn.addEventListener('click', clearScores);
viewscores.addEventListener('click', viewScoreList);
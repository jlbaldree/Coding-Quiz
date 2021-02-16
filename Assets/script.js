document.getElementById("initialsForm").style.display = "none"
document.getElementById("container").style.display = "none"
document.getElementById("next").disabled = true
const startBtn = document.querySelector("#start-button");

// var count = 0;
// var incrementEl = document.querySelector();
// var decrementEl = document.querySelector();
// var countEl = document.querySelector();
var timeEl = document.getElementById("countdown-display");


var secondsLeft = 30;

// This is the countdown timer
function setTime() {
	 document.getElementById("container").style.display = "block";
   var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time Left: " + secondsLeft + " seconds";
         
    if(secondsLeft === 0||questionId == questions.length) {
      clearInterval(timerInterval);
      calculateScore();
      document.getElementById("initialsForm").style.display = "block";
      document.getElementById("next").disabled = true;
      document.getElementById("submit").disabled = true;
      document.getElementById("container").style.display = "none";
    }
  }, 1000);
}
startBtn.addEventListener("click", setTime);

//List of questions. First mentioned answer is correct one
var questions = [{
    question: "Commonly used data types DO NOT include:",
    answers: ["alerts", "strings", "booleans", "numbers"],
    },
{
    question: "The condition in an if / else statement is enclosed wthin:",
    answers: ["parentheses", "quotes", "curly brackets", "square brackets"],
    },
{
    question: "Arrays in JavaScript can be used to store _______.",
    answers: ["all of the above", "numbers and strings", "other arrays", "booleans"],
    },
{   
    question: "String values must be enclosed with __________ when being assigned to variable.",
    answers: ["quotes", "commas", "curly brackets", "parentheses"],
    },
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["console log", "JavaScript", "terminal/bash", "for loops"],
}];

// Generic function to return a shuffled array:
function shuffled(arr) {
    arr = arr.slice(); // shallow copy
    for (var i = 0; i < arr.length; i++) {
        var j = Math.floor(Math.random() * (arr.length - i)) + i;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
}

// define variables for some of the HTML elements:
var domQuestion = document.querySelector("#question");
var domAnswers = Array.from(document.querySelectorAll("input[name=answer]"));
var domNext = document.querySelector("#next");
var domSubmit = document.querySelector("#submit");


function displayQuestion() {
    // get a random order for the answers:
    var answers = shuffled(questions[questionId].answers);
    // Display question
    domQuestion.textContent = " "+(questionId+1)+" - "+ 
                              questions[questionId].question;
    domAnswers.forEach(function (input, i){
        // Set checkbox value and unselect it
        input.value = answers[i];
        input.checked = false;
        // Display the answer text
        input.nextElementSibling.textContent = answers[i];
    });
}

// Initialize first question
var questionId = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var finalScore = 0;
displayQuestion()

// Respond to a click on the Next button 
domNext.addEventListener("click", function () {
    // next question
    if (questionId == questions.length) {
    document.getElementById("initials").style.display = "block";
    document.getElementById("next").disabled = true;
    document.getElementById("submit").disabled = true;
    document.getElementById("container").style.display = "none";
    } else {
    displayQuestion();
    document.getElementById("next").disabled = true;
    document.getElementById("submit").disabled = false;
    document.getElementById("answer-outcome").innerHTML = "Make a Selection.";
     }   
});
// submit answers to get to display right/wrong message
domSubmit.addEventListener("click", function () {
	// update correct answer counter:
	var domAnswer = domAnswers.find(input => input.checked);
     // update number of correctly and incorrectly answered questions:
    if (domAnswer.value == questions[questionId].answers[0]){correctAnswers++;
	document.getElementById("next").disabled = false;
	questionId++;
  document.getElementById("answer-outcome").innerHTML = "Correct!";}
else {
	wrongAnswers++;
	document.getElementById("next").disabled = false;
	questionId++;
  document.getElementById("answer-outcome").innerHTML = "Wrong!";
}
});

// this function calculates the user's final score
function calculateScore() {
	if (correctAnswers === 5) {
	finalScore = (correctAnswers*2)+secondsLeft;
	document.getElementById("msg").innerHTML = "All Done! You answered "+correctAnswers+" question(s) correctly with "+secondsLeft+" seconds remaining. Your final score is "+finalScore+".";
	} else {
	finalScore = Math.max(0,(correctAnswers*2)-wrongAnswers);
		document.getElementById("msg").innerHTML = "All Done! You answered "+correctAnswers+" question(s) correctly with "+secondsLeft+" seconds remaining. Your final score is "+finalScore+".";	
	}
};

var subButton = document.getElementById("subButton");
subButton.addEventListener("click", getInitials, false); 

// this function allows the user to input their initials upon quiz completion
function getInitials() {
var initialField = document.getElementById("initials").value;
var result = document.getElementById("result");

if (initialField.length < 3) {
    result.textContent = "Username must contain at least 3 characters";
    // alert('Username must contain at least 3 characters');
} else {
    highscoreInitials = initialField;
		savehighScores();
		window.location.href = "./index.html";
	}
}
const highScoresList = document.getElementById("highScoresList");		
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];		

// this function commits the 3 highest scores to the local memory		
function savehighScores() {		
		
		const score = {
		score: finalScore,
		initials: highscoreInitials
		};
	
		highScores.push(score);
	  highScores.sort( (a,b) => b.score - a.score)
		highScores.splice(3);
	
		localStorage.setItem("highScores", JSON.stringify(highScores));
		
}
// Displays list of the 3 highest scores 
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.initials}-${score.score}</li>`;
  })
  .join("");
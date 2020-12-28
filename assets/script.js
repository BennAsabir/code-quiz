// ARRAY AND OBJECT FOR QUESTIONS
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
// DECLARED VARIABLES
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// TIMER
var secondsLeft = 76;
// INTERVAL TIME
var holdInterval = 0;
// PENALTY TIME
var penalty = 10;

var ulCreate = document.createElement("ul");

// STARTS TIMER
timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// RENDERS QUESTIONS
function render(questionIndex) {
// CLEARS EXISTING DATA
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
// NEW FOR EACH QUESTION CHOICE
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// COMPARE CHOICES WITH ANSWER EVENT
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
// CORRECT CONDTION
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "CORRECT! The answer is:  " + questions[questionIndex].answer;
            
        } else {
// WILL DEDUCT 10 SECONDS OF secondsLeft IF ANSWER WRONG
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "WRONG! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
// DETERMINES QUESTION USER IS ON
    questionIndex++;

    if (questionIndex >= questions.length) {
// APPENDS LAST PAGE WITH USER STATS
        allDone();
        createDiv.textContent = "END OF QUIZ!" + " " + "YOU GOT  " + score + "/" + questions.length + " CORRECT!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// WILL APPEND LAST PAGE
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // HEADING:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "ALL DONE!"

    questionsDiv.appendChild(createH1);

    // PARAGRAPH
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // CALCULATES TIME REMAINING AND REPLACES IT WITH HIGHSCORE
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "YOUR FINAL SCORE IS: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // LABEL
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "ENTER YOUR INITIALS: ";

    questionsDiv.appendChild(createLabel);

    // INPUT
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // SUBMIT
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // CAPTURE INITIALS AND LOCAL STORAGE FOR SCORE
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // GOES TO FINAL PAGE
            window.location.replace("./highscore.html");
        }
    });
    

}
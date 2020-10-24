// view highscore button and the timer
let viewHighscores = document.getElementById("view-scores");
let time = document.getElementById("timer");


// quiz starter for the quiz opening
let showQuizStarter = document.getElementById("quiz-starter");
let startBtn = document.getElementById("start-btn");


// quiz content with the questions, question choices, and to verify the answer
let showQuizContent = document.getElementById("quiz-content");
let quizQuestion = document.getElementById("question");
let choices = document.getElementById("question-choices");
let verifyAnswer = document.getElementById("verify-answer");


// All done page where the user get their score and asked to input their initials
let showAllDonePage = document.getElementById("all-done");
let result = document.getElementById("final-score");
let initialInput = document.getElementById("user-initial");
let submitScoreBtn = document.getElementById("btn-initial-score-submit");


// Highscores page where user initial and highscores being kept and give the user ability to clear the highscores info
let highscoresPage = document.getElementsByClassName("highscores-content");
let viewUserInitialScore = document.getElementById("user-initials-score");
let backBtn = document.getElementById("btn-go-back");
let clearUserDataBtn = document.getElementById("btn-clear-highscores");


let totalQuizTime = 100; //total time for the quiz
let questionCount = 0; // question index to keep track which question we are on
let emptyArray = []; // create an array to store high scores
let storedHighscores = JSON.parse(window.localStorage.getItem("highScores")); // high scores array from local storage
let score = 0; // create variable to keep the score


// Create an questions object with the question, question answer choices, and the correct answer
let questions = [
    { 
        question: "Commonly used data types DO NOT include: ",
        quizChoices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts", 
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        quizChoices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses", 
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        quizChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above", 
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variable.",
        quizChoices: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes", 
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        quizChoices: ["JavaScript", "terminal/bash", "for loops", "console log"],
        correctAnswer: "console log", 
    },
];

// After start button click show quiz content, hide quiz starter and the all done page, show the questions,
// and start the timer.
startBtn.addEventListener("click", function() {

    showQuizContent.style.display = "block";
    showQuizStarter.style.display = "none";
    showAllDonePage.style.display = "none";

    renderQuestions();

    let timeInterval = setInterval(function() {
        totalQuizTime--;
        time.textContent ="";
        time.textContent = totalQuizTime;
        if ( totalQuizTime <= 0 || questionCount === questions.length) {
            clearInterval(timeInterval);
            getUserScore();
        }
    }, 1000);

});

// Function to render the questions and the questions answer choices
function renderQuestions() {

    // Hide quiz starter and show the quiz questions and the questions answer choices
    showQuizStarter.style.display = "none";
    showQuizContent.style.display = "block";

    // If the questionCount less than questions length display the questions and the questions answer choices.
    if ( questionCount < questions.length) {
        quizQuestion.innerHTML = questions[questionCount].question;
        choices.textContent = "";

        // Looping the quiz choices and then display it as an ordered list and button.
        for (let i=0; i < questions[questionCount].quizChoices.length; i++) {
            let choicesEl = document.createElement("ol");
            let choiceBtn = document.createElement("button");
            choicesEl.appendChild(choiceBtn);
            choiceBtn.innerText = questions[questionCount].quizChoices[i];
            choiceBtn.setAttribute("data-id", i);
            choiceBtn.setAttribute("class", "btn-choices");

            // After the answer choice clicked, if what the user clicked is the same as the correctAnswer,
            // the score will be the totalQuizTime and show to the user that their answer is correct, else score -10
            // and the total quiz time also -10 and show to the user that their answer is wrong
            choiceBtn.addEventListener("click", function(e) {
                e.stopPropagation();

                if (choiceBtn.innerText === questions[questionCount].correctAnswer) {
                    score += totalQuizTime;
                    verifyAnswer.innerText = "Correct!";
                }
                else {
                    score -= 10;
                    totalQuizTime = totalQuizTime - 10;
                    verifyAnswer.innerText = "Wrong!";
                }

                quizQuestion.innerHTML = "";

                // If the question where we are at the same as the questions length then return,
                // else add the question count to the next question and display the question content
                if (questionCount === questions.length) {
                    return;
                }
                else {
                    questionCount++;
                    renderQuestions();
                }
            });
            
            // append the choices elements to the div with the id="question-choices" in the html
            choices.append(choicesEl);
        }
    }
}

// Getting the user score and display it after user finish answering the questions
function getUserScore() {

    // Hide verify answer and verify answer line, and show the all done page
    showAllDonePage.style.display = "block";
    verifyAnswer.style.display = "none";
    document.getElementById("verify-answer-line").style.display = "none";

    choices.textContent = "";

    // Set the text inside the div tag with id="final-score" about the user final score.
    result.innerHTML = `Your final score is ${score}.`;

    // After the submit button click
    submitScoreBtn.addEventListener("click", function(e) {
        e.preventDefault();

        // go to the high scores page
        window.location.replace("./highscores.html");

        // defining score from stored highscores array from local storage and the empty array that later 
        let scoresArray = defineScoresArray(storedHighscores, emptyArray);

        // get the user initial value
        let initials = initialInput.value;

        // create object that contain user's initials and scores
        let userInitialScore = {
            initials: initials,
            score: score,
        };

        // add initials and score to the array
        scoresArray.push(userInitialScore);

        // call functions:
        saveUserScores(scoresArray);
        renderAllScores();
        clearScoresBtn();
        goBackBtn(); 
    });
}

// Function to save user scores in the local storage with the name saveUserData
function saveUserScores(array) {
    window.localStorage.setItem("saveUserData", JSON.stringify(array));
}

// Function to define the score array if the first not null then return it else return the second array
function defineScoresArray(arr1, arr2){
    if(arr1 !== null) {
        return arr1;
    }
    else {
        return arr2;
    }
}

// display all the scores
function renderAllScores() {
    let scoresArray = defineScoresArray(storedHighscores, emptyArray);

    // for each object in the scores array,
    // called each of the initials and score,
    // create an ordered list element, set the initials and scores to it,
    // and then display it in high scores list.
    scoresArray.forEach(obj => {
        let initials = obj.initials;
        let storedScore = obj.score;
        let finalresult = document.createElement("ol");
        finalresult.innerText = `${initials}: ${storedScore}`;
        viewUserInitialScore.append(finalresult); 
    });
}

// view high score button to show the high scores page
function viewScores(){
    viewHighscores.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.replace("./highscores.html");
    });
}

// clear the user initials and score
function clearScoresBtn() {
    clearUserDataBtn.addEventListener("click", function(e){
        e.preventDefault();
        window.localStorage.removeItem("saveUserData");
    });
}

// go back button the where the quiz start
function goBackBtn() {
    backBtn.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.replace("./index.html");
    });
}

viewScores();
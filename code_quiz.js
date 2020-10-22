let time = document.getElementById("#timer");
let start = document.getElementById("#start");
let question = document.getElementById("#question");
let choiceOne = document.getElementById("#choice-one");
let choiceTwo = document.getElementById("#choice-two");
let choiceThree = document.getElementById("#choice-three");
let choiceFour = document.getElementById("#choice-four");
let wrongCorrectAnswer = document.getElementById("#wrong-correct-answer");

let quizTime = 150;
let questionNumber = 0;
let score= 0;

let questions = [
    { 
        question: "Commonly used data types DO NOT include: ",
        choiceOne: "strings",
        choiceTwo: "booleans",
        choiceThree: "alerts",
        choiceFour: "numbers",
        correctAnswer: "three", 
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choiceOne: "quotes",
        choiceTwo: "curly brackets",
        choiceThree: "parentheses",
        choiceFour: "square brackets",
        correctAnswer: "three", 
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choiceOne: "numbers and strings",
        choiceTwo: "other arrays",
        choiceThree: "booleans",
        choiceFour: "all of the above",
        correctAnswer: "four", 
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variable.",
        choiceOne: "commas",
        choiceTwo: "curly brackets",
        choiceThree: "quotes",
        choiceFour: "parentheses",
        correctAnswer: "three", 
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        choiceOne: "JavaScript",
        choiceTwo: "terminal/bash",
        choiceThree: "for loops",
        choiceFour: "console log",
        correctAnswer: "four", 
    },
];

function showQuestions() {
    let quizQuestion = questions[questionNumber];
    question.textContent = quizQuestion.question;
    choiceOne.textContent = quizQuestion.choiceOne;
    choiceTwo.textContent = quizQuestion.choiceTwo;
    choiceThree.textContent = quizQuestion.choiceThree;
    choiceFour.textContent = quizQuestion.choiceFour;
}

function verifyAnswer(answer) {
    if (answer === questions[questionNumber].correctAnswer) {
        questionNumber++;
        score++;
    }

    if(questionNumber < questions.length) {
        showQuestions();
    }
    else {
        quizTime = parseInt(time.innerText);
        quizTime -= 10;
        time.innerText = quizTime;
    }

    
}

function addToLocalStorage() {
    if (score === 5) {
        let userInput = prompt("Your score is: " + quizTime + "Please enter your initial here.");
        localStorage.setItem('txt', )
    }
    localStorage.setItem('txt', userInput);
}

function goBack() {
    history.go(-1);
}

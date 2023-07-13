const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ],
        answer: 2
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        options: [
            "1. quotes",
            "2. curly brackets",
            "3. parentheses",
            "4. square brackets"
        ],
        answer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        answer: 3
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parentheses"
        ],
        answer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console log"
        ],
        answer: 3
    }
];

const startBtn= document.getElementById("start-button");
const timerE1 = document.getElementById("timer");
const questionE1 = document.getElementById("question");
const optionsE1 = document.getElementById("options");
const resultTextE1 = document.getElementById("result-text");
const initialsInput = document.getElementById("initials");
const scoreForm = document.getElementById("score-form");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

startBtn.addEventListener("click",startQuiz);
optionsE1.addEventListener("click",handleAnswer);
scoreForm.addEventListener("submit",saveScore);

function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    startTimer();
    showQuestion();
} 

function startTimer() {
    timerInterval = setInterval(function(){
        timeLeft --;
        timerE1.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    },1000);
}

function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionE1.textContent = question.question;

    optionsE1.innerHTML = '';
    question.options.forEach(function(option,index){
        const li =document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent =option.substring(3);
        btn.setAttribute('data-index',index);
        btn.classList.add('option');
        li.appendChild(btn);
        optionsE1.appendChild(li);
    });
}


function handleAnswer(event) {
    if (!event.target.matches('button.option')) return;
    
    const selectedOptionIndex = parseInt(event.target.getAttribute('data-index'));
    const question = quizQuestions[currentQuestionIndex];

    if (selectedOptionIndex === question.answer) {
        resultTextE1.textContent = 'Correct!';
    } else {
        resultTextE1.textContent = 'Wrong!';
        timeLeft -= 10;
        if (timeLeft <0) timeLeft =0;
        timerE1.textContent =timeLeft;
    }

    
    resultScreen.classList.remove('hidden');
    quizScreen.classList.add("hidden");
    
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(function(){
            resultScreen.classList.add("hidden");
            quizScreen.classList.remove("hidden");
            showQuestion();
        },1000);
    }else{
        setTimeout(endQuiz,1000);
    }
}

function endQuiz(){
    clearInterval(timerInterval);
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultTextE1.textContent = "Your final score is "+ timeLeft;
}

function saveScore(event) {
    event.preventDefault();
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        console.log('Initials:' , initials);
        console.log('Score:', timeLeft);
    }
}




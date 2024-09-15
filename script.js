const userName = prompt("Your Name Please");

const question = [
    {
        question: "How many elements are in the periodic table?",
        answer: [
            { text: "117", correct: false },
            { text: "118", correct: true },
            { text: "119", correct: false },
            { text: "125", correct: false },
        ]
    },
    {
        question: "Which planet in the Milky Way is the hottest?",
        answer: [
            { text: "Sun", correct: false },
            { text: "Mars", correct: false },
            { text: "Earth", correct: false },
            { text: "Venus", correct: true },
        ]
    },
    {
        question: "Who discovered that the Earth revolves around the sun? ",
        answer: [
            { text: "Albert Einstein", correct: false },
            { text: "Nicolaus Copernicus", correct: true },
            { text: "Sir Isaac Newton", correct: false },
            { text: "None", correct: false },
        ]
    },
    {
        question: "Which planet has the most moons?",
        answer: [
            { text: "Saturn", correct: true },
            { text: "Earth", correct: false },
            { text: "Sun", correct: false },
            { text: "Mercury", correct: false },
        ]
    },
    {
        question: "Where is the strongest human muscle located? ",
        answer: [
            { text: "Abdominal", correct: false },
            { text: "Jaw", correct: true },
            { text: "Pectoral", correct: false },
            { text: "Erector spinae", correct: false },
        ]
    },
    {
        question: "Which planet is closest to the sun?",
        answer: [
            { text: "Earth", correct: false },
            { text: "Moon", correct: false },
            { text: "Venus", correct: false },
            { text: "Mercury", correct: true },
        ]
    },
    {
        question: "Which is the only body part that is fully grown from birth?",
        answer: [
            { text: "Eyes", correct: true },
            { text: "Hair", correct: false },
            { text: "Brain", correct: false },
            { text: "Nose", correct: false },
        ]
    },
    {
        question: "How many bones do we have in an ear?",
        answer: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What scientific theory proposed that Earth revolves around the sun?",
        answer: [
            { text: "Relativity", correct: false },
            { text: "Heliocentrism", correct: true },
            { text: "Newtons Third law of motion", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is the process by which plants convert sunlight to energy?",
        answer: [
            { text: "Photosynthesis", correct: true },
            { text: "photomorphogenesis", correct: false },
            { text: "photoperiodism", correct: false },
            { text: "All of the above", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion =  question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ` ${userName}:
    You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; 
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();


let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionForm = document.getElementById('question-form');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resultsDiv = document.getElementById('results');
const scoreSpan = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

// Event Listeners
questionForm.addEventListener('submit', addQuestion);
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartQuiz);

function addQuestion(e) {
    e.preventDefault();
    
    const question = {
        question: document.getElementById('question').value,
        correctAnswer: document.getElementById('correct-answer').value,
        answers: [
            document.getElementById('correct-answer').value,
            document.getElementById('wrong1').value,
            document.getElementById('wrong2').value,
            document.getElementById('wrong3').value,
        ]
    };
    
    questions.push(question);
    questionForm.reset();
    alert('Question added successfully!');
}

function startQuiz() {
    if (questions.length === 0) {
        alert('Please add some questions first!');
        return;
    }
    
    score = 0;
    currentQuestionIndex = 0;
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    resultsDiv.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showQuestion(question) {
    questionText.innerText = question.question;
    // Shuffle answers
    const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);
    
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.innerText === questions[currentQuestionIndex].correctAnswer;
    
    if (correct) score++;
    
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.innerText === questions[currentQuestionIndex].correctAnswer);
    });
    
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        showResults();
    }
}

function setStatusClass(element, correct) {
    element.classList.remove('correct', 'wrong');
    element.classList.add(correct ? 'correct' : 'wrong');
}

function showResults() {
    questionContainer.classList.add('hide');
    resultsDiv.classList.remove('hide');
    scoreSpan.textContent = `${score} out of ${questions.length}`;
}

function restartQuiz() {
    resultsDiv.classList.add('hide');
    startButton.classList.remove('hide');
} 
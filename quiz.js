const questions = [
    {
        question: "What is my full name ?",
        answers: [
            { text: "Kaushal", correct: "false" },
            { text: "Kaushal Jacker", correct: "false" },
            { text: "Kaushal Kumar", correct: "false" },
            { text: "Kaushal Yadav", correct: "true" }
        ]
    },
    {
        question: "What is my favourite color ?",
        answers: [
            { text: "black", correct: "true" },
            { text: "blue", correct: "false" },
            { text: "red", correct: "false" },
            { text: "pink", correct: "false" }
        ]
    },
    {
        question: "Which flavour of ice-cream i like most ?",
        answers: [
            { text: "chocolate", correct: "false" },
            { text: "butterscoutch", correct: "true" },
            { text: "vanilla", correct: "false" },
            { text: "maple", correct: "false" }
        ]
    },
    {
        question: "Favourite Cricketer ?",
        answers: [
            { text: "dhoni", correct: "false" },
            { text: "sachin", correct: "false" },
            { text: "kohli", correct: "true" },
            { text: "rohit", correct: "false" }
        ]
    },
    {
        question: "Color of my eyes ?",
        answers: [
            { text: "brown", correct: "false" },
            { text: "blue", correct: "false" },
            { text: "black", correct: "true" },
            { text: "green", correct: "false" }
        ]
    },
    {
        question: "Born ?",
        answers: [
            { text: "27 sep", correct: "false" },
            { text: "28 sep", correct: "true" },
            { text: "28 oct", correct: "false" },
            { text: "24 sep", correct: "false" }
        ]
    },
    {
        question: "Occupation ?",
        answers: [
            { text: "student", correct: "false" },
            { text: "un-employed", correct: "false" },
            { text: "working", correct: "true" }
        ]
    },
    {
        question: "Education ?",
        answers: [
            { text: "graduate", correct: "true" },
            { text: "12th pass", correct: "false" },
            { text: "master degree", correct: "false" },
            { text: "10th pass", correct: "false" }
        ]
    }
    // {
    //     question: "Which tag is used to create form ?",
    //     answers: [
    //         { text: "form", correct: "true" },
    //         { text: "fieldset", correct: "false" },
    //         { text: "legend", correct: "false" },
    //         { text: "div", correct: "false" }
    //     ]
    // },
    // {
    //     question: "Which tag is used to create form ?",
    //     answers: [
    //         { text: "form", correct: "true" },
    //         { text: "fieldset", correct: "false" },
    //         { text: "legend", correct: "false" },
    //         { text: "div", correct: "false" }
    //     ]
    // },
    // {
    //     question: "Which tag is used to create form ?",
    //     answers: [
    //         { text: "form", correct: "true" },
    //         { text: "fieldset", correct: "false" },
    //         { text: "legend", correct: "false" },
    //         { text: "div", correct: "false" }
    //     ]
    // },
    // {
    //     question: "Which tag is used to create form ?",
    //     answers: [
    //         { text: "form", correct: "true" },
    //         { text: "fieldset", correct: "false" },
    //         { text: "legend", correct: "false" },
    //         { text: "div", correct: "false" }
    //     ]
    // },

    // {
    //     question: "Which tag is used for hyerlink ?",
    //     answers: [
    //         { text: "div", correct: "false" },
    //         { text: "fieldset", correct: "false" },
    //         { text: "a", correct: "true" },
    //         { text: "div", correct: "false" }
    //     ]
    // },

    // {
    //     question: "Which tag is used to take input ?",
    //     answers: [
    //         { text: "form", correct: "false" },
    //         { text: "fieldset", correct: "false" },
    //         { text: "legend", correct: "false" },
    //         { text: "input", correct: "true" }
    //     ]
    // }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(
        answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);

            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        }
    );
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();
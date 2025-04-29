let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval;
let timeLeft = 15;
let score = 0;
let username = "";

// Quiz questions (add more as needed)
const quizQuestions = [
  {
    question: "What is the time complexity of binary search in a sorted array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: "O(log n)"
  },
  {
    question: "Which of the following is not a valid data structure?",
    options: ["Stack", "Queue", "ArrayList", "Integer"],
    correctAnswer: "Integer"
  },
  // Add more questions as needed
];

// Start quiz after entering user name
function startQuiz() {
  username = document.getElementById('username').value;
  if (!username) {
    alert("Please enter your name!");
    return;
  }

  // Hide username input and show quiz content
  document.getElementById('username-container').style.display = 'none';
  document.getElementById('quiz-content').style.display = 'block';

  loadQuestion();
  startTimer();
}

// Load the current question
function loadQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Update question number dynamically
  document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1}`;

  document.getElementById('question').textContent = currentQuestion.question;
  const options = document.querySelectorAll('.option-btn');

  options.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.disabled = false;
    button.classList.remove('selected', 'correct', 'incorrect');
  });
  
  // Hide "Next" and show "Submit" button
  document.getElementById('submit-btn').style.display = 'inline-block';
  document.getElementById('next-btn').style.display = 'none';

  // Reset user answer for this question
  userAnswers[currentQuestionIndex] = null;

  // Reset and start timer for this question
  resetTimer();
  startTimer();
}

// Select option and highlight it
function selectOption(button) {
  // Deselect all buttons
  const options = document.querySelectorAll('.option-btn');
  options.forEach(btn => btn.classList.remove('selected'));

  // Mark this button as selected
  button.classList.add('selected');
  userAnswers[currentQuestionIndex] = button.textContent; // Save selected answer

  // Enable "Submit" button after selection
  document.getElementById('submit-btn').style.display = 'inline-block';
}

// Submit the selected answer for the current question
function submitAnswer() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  // Highlight the selected answer
  const selectedButton = [...document.querySelectorAll('.option-btn')].find(btn => btn.textContent === selectedAnswer);
  if (selectedButton) {
    selectedButton.classList.add('selected');
  }

  // Check if the selected answer is correct
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    if (selectedButton) selectedButton.classList.add('correct');
  } else {
    // Highlight the correct answer
    const correctButton = [...document.querySelectorAll('.option-btn')].find(btn => btn.textContent === currentQuestion.correctAnswer);
    if (correctButton) correctButton.classList.add('correct');

    if (selectedButton) selectedButton.classList.add('incorrect');
  }

  // Hide submit button and show next button
  document.getElementById('submit-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'inline-block';
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  // If more questions remain, load next question
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval); // Ensure timer is cleared when quiz ends
  document.getElementById('score').textContent = `${score} / ${quizQuestions.length}`;
  document.getElementById('score-container').style.display = 'block';
}

// Timer functions
function startTimer() {
  // Ensure that no previous timers are running
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Start the timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

    // Add blinking effect when 5 seconds are left
    if (timeLeft <= 5) {
      document.getElementById('timer').classList.add('blink-background');
    } else {
      document.getElementById('timer').classList.remove('blink-background');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop timer when time is up
      submitAnswer(); // Auto-submit when time is up
    }
  }, 1000);
}

function resetTimer() {
  // Reset the timer value and clear any existing timer
  timeLeft = 15;
  document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
  document.getElementById('timer').classList.remove('blink-background'); // Ensure blinking is off when timer resets
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  document.getElementById('score-container').style.display = 'none';
  loadQuestion();
  startTimer();
  document.getElementById('quiz-content').style.display = 'block';
  document.getElementById('username-container').style.display = 'none';
}

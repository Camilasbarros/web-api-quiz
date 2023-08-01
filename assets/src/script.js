// "DOM Content Loaded Event Listener and Element References"
document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start");
  const timer = document.getElementById("time");
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  const endScreen = document.getElementById("end-screen");
  const finalScore = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitBtn = document.getElementById("submit");
  const feedback = document.getElementById("feedback");

  // "Variables for Current Question Index, Time Left, and Timer Interval"
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let timerInterval;

  // "Array of Quiz Questions and Answers"
  const questions = [
    {
      question: "What does HTML stand for?",
      choices: [
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
      ],
      answer: 0, // The correct answer is the second choice (index 0) "Hyper Text Markup Language"
    },
    {
      question: "Which element is used for a line break in HTML?",
      choices: ["<br>", "<lb>", "<break>"],
      answer: 0, // The correct answer is the second choice (index 0) "<br>"
    },
    {
      question: "What is an Event Listener in JavaScript?",
      choices: [
        "It's a function that randomly triggers events.",
        "It's a function that waits for a specific event to occur before being executed.",
        "None of the above.",
      ],
      answer: 1, // The correct answer is the second choice (index 1) "It's a function that waits for a specific event to occur before being executed.",
    },
    {
      question:
        "How can we prevent the default behavior of an event in JavaScript?",
      choices: [
        "By using the 'stopPropagation()' function.",
        "By using the 'preventDefault()' function.",
        "None of the above.",
      ],
      correctAnswer: 1, // The correct answer is the second choice (index 1) "By using the 'preventDefault()' function."
    },
    {
      question: "What is the DOM (Document Object Model) in web development?",
      choices: [
        "It's a style sheet language used for describing the presentation of a document written in HTML.",
        "It's a programming interface for HTML and XML documents.",
        "It's a scripting language that allows interactive and dynamic website development.",
      ],
      correctAnswer: 1, // The correct answer is the second choice (index 1) "It's a programming interface for HTML and XML documents."
    },
    {
      question: "What does the 'keyup' event represent in JavaScript?",
      choices: [
        "It occurs when a key is pressed down.",
        "It occurs when a key is released.",
        "It occurs when a key is pressed and released.",
      ],
      correctAnswer: 1, // The correct answer is the second choice (index 1) "It occurs when a key is released."
    },
    {
      question: "What does the term 'stop propagation' mean in event handling?",
      choices: [
        "It refers to the process of stopping an event from occurring.",
        "It refers to the process of preventing an event from bubbling up the DOM tree.",
        "It refers to the process of capturing an event during the event's propagation phase.",
      ],
      correctAnswer: 1, // The correct answer is the second choice (index 1) "It refers to the process of preventing an event from bubbling up the DOM tree."
    },
    {
      question: "What is the purpose of data attributes in HTML elements?",
      choices: [
        "To store metadata about the element.",
        "To define custom data specific to the webpage.",
        "To provide additional information about an element without using classes or inline styles.",
      ],
      correctAnswer: 2, // The correct answer is the third choice (index 2) "To provide additional information about an element without using classes or inline styles."
    },
    {
      question:
        "Which method is used to select multiple elements in the DOM with the same class name?",
      choices: ["querySelector", "getElementById", "getElementsByClassName"],
      correctAnswer: 2, // The correct answer is the third choice (index 2) "getElementsByClassName"
    },
  ];

  // "Function to Start the Timer for the Quiz"
  function startTimer() {
    timerInterval = setInterval(function () {
      timeLeft--;
      timer.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  // "Function to Display Current Question and Choices"
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";

    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choiceBtn = document.createElement("button");
      choiceBtn.textContent = currentQuestion.choices[i];
      choiceBtn.addEventListener("click", function () {
        checkAnswer(i);
      });
      choicesContainer.appendChild(choiceBtn);
    }
  }

  // "Function to Check the Answer and Provide Feedback"
  function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
      feedback.textContent = "Correct!";
      //const soundEffect1 = document.getElementById("sound");
      //soundEffect1.play();
    } else {
      feedback.textContent = "Wrong!";
      //const soundEffect2 = document.getElementById("sound-effect-2");
      //soundEffect2.play();
      timeLeft -= 10;
    }

    // "Updating the Current Question Index and Showing Next Question or Ending the Quiz"
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  // "Function to End the Quiz and Display Final Score"
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("questions").classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.textContent = timeLeft;
  }
  // "Function to Save the Player's Score and Initials to Local Storage"
  function saveScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    const newScore = {
      initials: initials,
      score: score,
    };
    // "Storing High Scores, Sorting, and Updating Local Storage"
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  // "Event Listeners for Start Button and Submit Button"
  startBtn.addEventListener("click", function () {
    startTimer();
    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("questions").classList.remove("hide");
    showQuestion();
  });

  submitBtn.addEventListener("click", function () {
    const initials = initialsInput.value.trim().toUpperCase();

    if (initials === "") {
      alert("Please enter your initials.");
      return;
    }

    saveScore(initials, timeLeft);

    // "Redirect to the high scores page (highscores.html)"
    window.location.href = "highscores.html";

    // "Retrieve and display high scores from local storage"
    const highScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(highScores);
  });
});

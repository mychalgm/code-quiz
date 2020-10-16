var testPosition = 0;
var correctAnswers = 0;
var test;
var testProgress;
var question;
var userAnswer;
var choicesPossible;
var choiceA;
var choiceB;
var choiceC;
var quizTimer = 45;

var questions = [
  {
    question: "Inside which HTML element do we place the JavaScript?",
    a: "&lt;script&gt;",
    b: "&lt;js&gt;",
    c: "&lt;javascript&gt;",
    answer: "a",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    a: "The head section",
    b: "The body section",
    c: "Both A and B",
    answer: "c",
  },
  {
    question:
      "Is it necessary for the external script file to contain a &lt;script&gt; tag?",
    a: "Yes",
    b: "No",
    c: "Sometimes",
    answer: "b",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'script.js'?",
    a: "&lt;script name='script.js'&gt;",
    b: "&lt;script href='script.js'&gt;",
    c: "&lt;script src='script.js'&gt;",
    answer: "c",
  },
];

function get(x) {
  return document.getElementById(x);
}

// enables the 'start quiz' button to start the quiz
function start() {
  get("start-button").setAttribute("style", "display: none");
  get("quiz-title").setAttribute("style", "display: none");
  get("quiz-inst").setAttribute("style", "display: none");
  get("show-quiz").setAttribute("style", "display: block !important");
  renderQuestion();
}

function renderQuestion() {
  test = get("test");
  if (testPosition >= questions.length) {
    test.innerHTML =
      "<h3>you got " +
      correctAnswers +
      " of " +
      questions.length +
      " questions correct</h3>";
    get("test-progress").innerHTML = "<h2>test completed</h2>";
    // resets the variable to allow users to restart the test
    testPosition = 0;
    correctAnswers = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;
  }
  get("test-progress").innerHTML =
    "question " + (testPosition + 1) + " of " + questions.length;

  question = questions[testPosition].question;
  choiceA = questions[testPosition].a;
  choiceB = questions[testPosition].b;
  choiceC = questions[testPosition].c;
  // display the question
  test.innerHTML = "<h3>" + question + "</h3>";
  // display the answer options
  // the += appends to the data we started on the line above
  test.innerHTML +=
    "<label> <input type='radio' name='choicesPossible' value='a'> " +
    choiceA +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type='radio' name='choicesPossible' value='b'> " +
    choiceB +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type='radio' name='choicesPossible' value='c'> " +
    choiceC +
    "</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>submit answer</button>";
  get("timer").innerHTML = quizTimer;
}

function checkAnswer() {
  // use getElementsByName because we have an array which it will loop through
  choicesPossible = document.getElementsByName("choicesPossible");
  for (var i = 0; i < choicesPossible.length; i++) {
    if (choicesPossible[i].checked) {
      userAnswer = choicesPossible[i].value;
    }
  }
  // checks if answer matches the correct choice
  if (userAnswer == questions[testPosition].answer) {
    //each time there is a correct answer this value increases
    correctAnswers++;
  }
  // changes position of which character user is on
  testPosition++;
  // then the renderQuestion function runs again to go to next question
  renderQuestion();
}

// Add event listener to call renderQuestion on page load event
//window.addEventListener("load", renderQuestion);
get("start-button").addEventListener("click", start);

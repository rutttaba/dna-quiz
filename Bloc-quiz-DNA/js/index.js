'use strict'

const QUIZ = [
    { 
        question: 'What is the function of DNA?',
        answers: {
            a: 'DNA passes along information from parents to offspring and tells our cells what proteins to make',
            b: 'DNA fills the cells so the wouldn’t be empty',
            c: 'DNA is the building block of our bodies',
            d: 'DNA is found only in GMOs and therefore something to be afraid of'
        },
        correctAnswer: 'DNA passes along information from parents to offspring and tells our cells what proteins to make'
    },
    {
        question: 'When was the structure of the DNA molecule discovered?',
        answers: {
            a: '1933',
            b: '1953',
            c: '1973',
            d: '1993'
        },
        correctAnswer: '1953'
    },
    {
        question: 'The structure of a DNA molecule is a double helix. What does it look like?',
        answers: {
            a: 'A twisted ladder',
            b: 'A red balloon',
            c: 'An ice cream cone',
            d: 'A stack of cubes'
        },
        correctAnswer: 'A twisted ladder'  
    },
    {
        question: 'How many chromosomes does a human have?',
        answers: {
            a: '23',
            b: '29',
            c: '35',
            d: '46'
        },
        correctAnswer: '46',
    },
    {
        question: 'DNA molecule is made of units called basepairs. There a 4 different basepairs.Scientist have a shorthand naming them - 1 letter = 1 basepair.What are the 4 letters in our DNA?',
        answers: {
            a: 'A, T, G, C',
            b: 'A, B, C, D',
            c: 'D, N, A, M',
            d: 'G, E, N, S'
        },
        correctAnswer: 'A, T, G, C'
    },
    {
        question: 'DNA is made up of basepairs - A, T, G, C. How many letters do we have in a human genome in all?',
        answers: {
            a: '2 million',
            b: '82 million',
            c: '3 200 million',
            d: '4 700 million'
        },
        correctAnswer: '3 200 million'
    },
    {
        question: 'Parts of DNA molecule have instructions to make proteins. How are those parts called?',
        answers: {
            a: 'RNA',
            b: 'Genes',
            c: 'Genetics',
            d: 'Cells'
        },
        correctAnswer: 'Genes'
    },
    {
        question: 'Genes make up only a small part of our DNA, there is a lot of DNA that is not genes. How much of our DNA is genes?',
        answers: {
            a: '1 - 2 %',
            b: '8 - 10 %',
            c: '15 - 18 %',
            d: '25 - 30 %'
        },
        correctAnswer: '1 - 2 %'
    },
    {
        question: 'We share genetic similarities with several unexpected species. How much of our genes do we share with mice?',
        answers: {
            a: '51 %',
            b: '74 %',
            c: '92 %',
            d: '99 %'
        },
        correctAnswer: '92 %'
    },
    {
        question: 'How similar is the DNA of identical twins?',
        answers: {
            a: '90%',
            b: '95%',
            c: '99%',
            d: '100%'
        },
        correctAnswer: '100%'
    },
    {
        question: 'DNA is located in the nucleus (in the middle of the cell). When it needs to send messages to the rest of the cell it uses …',
        answers: {
            a: 'Other DNA molecules',
            b: 'RNA',
            c: 'cDNA',
            d: 'gene'
        },
        correctAnswer: 'RNA'
    }];
// variables to keep track of score and questio number
    let score = 0;
    let questionNumber = 0;
   


// check where you are in the questions array and render either a question or final result page
function makeQuestion() {
    if(questionNumber < QUIZ.length) {
        return createQuestion(questionNumber);
    } else {
        $('.js-question').hide();
        $('.js-question-no').text(11);
        showResults();
    }
}

//make html for question
function createQuestion(qIdx) {
    let formBuilder = $(`<form>
        <fieldset>
          <legend class="questionText">${QUIZ[qIdx].question}</legend>
        </fieldset>
    </form>`);

    let placeSelector = $(formBuilder).find('fieldset');

    let options = Object.values(QUIZ[qIdx].answers);
    options.forEach(function (val, idx) {
        $(`<div><label class="js-options" for="${idx}">
        <input class="radio" type="radio" id="${idx}" value="${val}" name="answer" required>
        <span>${val}</span>
      </label></div>
      `).appendTo(placeSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit </button > `).appendTo(placeSelector);
    return formBuilder;
}

// updates the score value and renders it to the page
function keepScore() {
    score++;
    $('.js-score').text(score);
}

// updates the question number value and renders it to the page
function updateQuestionNo() {
    questionNumber++;
    $('.js-question-no').text(questionNumber + 1);
}

// begins the quiz
function beginQuiz() {
    $('.altContainer').hide();
    $('.js-start').on('click', '.startButton', function(event) {
        $('.js-start').hide();
        $('.js-question-no').text(questionNumber + 1);
        $('.js-question').show();
        $('.js-question').prepend(makeQuestion());
    });
}

// submits the answer and checks if it right or wrong
function checkAnswer() {
    $('.js-dna-quiz').on('submit', function(event) {
        event.preventDefault();
        $('.altContainer').hide();
        $('.js-response').show();
        let chosen = $('input:checked').val();
        if(chosen === QUIZ[questionNumber].correctAnswer) {
            rightAnswer();
        } else {
            wrongAnswer();
        }
    });
}

//when the answer is correct, increments score and gives feedback
function rightAnswer() {
    $('.js-response').html(
        `<h3>You picked the right answer!!</h3>
    <img src="images/happy.jpg" alt="happy scientist" class="images" width="200px">
      <p class="textSize">You know your DNA!</p>
      <button type="button" class="nextButton button"> Next </button>`
    );
    keepScore();
}

//when the answer is incorrect, gives feedback
function wrongAnswer() {
    $('.js-response').html(
        `<h3>You picked the wrong answer!!</h3>
    <img src="images/sad.jpg" alt="sad scientist" class="images" width="200px">
      <p class="textSize">The right answer is: </p>
      <p class="textSize">${QUIZ[questionNumber].correctAnswer} </p>
      <button type="button" class="nextButton button"> Next </button>`
    );
   
}

//renders the next question
function nextQuestion() {
    $('.js-dna-quiz').on('click', '.nextButton', function(event) {
        $('.altContainer').hide();
        $('.js-question').show();
        updateQuestionNo();
        $('.js-question form').replaceWith(makeQuestion());
    });
}

//final score and feedback in the end
function showResults() {
    $('.js-final').show();
    let disp = [];
    const great = ['Super!', 'You might want to consider a career in science!'];
    const good = ['Pretty good!', 'You know quite a lot about DNA, but may want to study some more'];
    const bad = ['Have ever even heard of DNA?', 'You should keep studying..'];

    if(score >= 9) {
        disp = great;
    } else if(score < 9 && score > 4) {
        disp = good;
    } else {
        disp = bad;
    }

    return $('.js-final').html(
        `<h3>${disp[0]}</h3>
        <h3>Your score is ${score} / 11</h3>
        <p class="js-options">${disp[1]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
    )
}

// resets the quiz, sets score and question number to zero 
function startAllOver() {
    $('.js-dna-quiz').on('click', '.restartButton', function(event) {
        event.preventDefault();
        score = 0;
        questionNumber = 0;
        $('.js-score').text(0);
        $('.js-question-no').text(0);
        $('.altContainer').hide();
        $('.js-start').show();
    });
    
}

function buildQuiz() {
    beginQuiz();
    makeQuestion();
    checkAnswer();
    nextQuestion();
    startAllOver();
}

$(buildQuiz);


               


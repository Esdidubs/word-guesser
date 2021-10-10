let randomWord = passphrases[Math.floor(Math.random() * passphrases.length)];
let numberOfGuesses = 0;

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
var timer = setInterval( function(){
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
}, 1000);


function phraseSub(){
    event.preventDefault();
    let answerText = ``;
    let guess = $("#guess").val();
    guess = guess.toLowerCase();
    numberOfGuesses++;
    
    let lengthCheck = lengthCheckFunc(guess);
    let letterCheck = letterCheckFunc(guess);
    let locationCheck = locationCheckFunc(guess);
    
    console.log(randomWord)

    if(guess == randomWord){
        $("#guess").prop('disabled', true);
        answerText = `
            <p>- You guessed the word!</p>
            <p>- It took you ${numberOfGuesses} guesses</p>
        `;
        $('.subBtn').html(`
            <button id="phraseBtn" onclick="tryAgain()">Play Again</button>
        `);
        clearInterval(timer);
    } else {
        $('#guess').val('');
        answerText += `<p>- Your guess was '${guess}'.</p>`;
        answerText += `<p>- That is incorrect.</p>`;
        answerText += `<p>- You've guessed ${numberOfGuesses} times.`
        answerText += `<p>- Your guess is ${lengthCheck}.</p>`;
        answerText += `<p>- You have ${letterCheck} correct letters.</p>`;
        answerText += `<p>- You have ${locationCheck} letters in the correct spot.</p>`;
    }

    $('#answerBox').html(`
        ${answerText}
    `);
};

function giveUp(){
    event.preventDefault();
    let answerText = ``;
    $("#guess").prop('disabled', true);
        answerText = `
            <p>- You gave up on guessing after ${numberOfGuesses} guesses.</p>
            <p>- The correct word was ${randomWord}.</p>
        `;
        $('.subBtn').html(`
            <button id="phraseBtn" onclick="tryAgain()">Play Again</button>
        `);
        clearInterval(timer);
        $('#answerBox').html(`
        ${answerText}
    `);
}

function lengthCheckFunc(guess){
    let length;
    if(guess.length == randomWord.length){
        length = 'the correct length';
    } else if(guess.length < randomWord.length) {
        length = 'too short';
    } else if(guess.length > randomWord.length) {
        length = 'too long';
    }
    return length;
}

function letterCheckFunc(guess){
    let guessArr = guess.split('');
    let answerArr = randomWord.split('');
    let letterObj = {};
    let ansLetterObj = {};
    let correctLetters = 0;

    for(let letter in answerArr){
            if(ansLetterObj[answerArr[letter]]==undefined){
                ansLetterObj[answerArr[letter]]={
                    count:1
                }
                
            } else {
                ansLetterObj[answerArr[letter]].count++;
            }
    }

    for(let letter in guessArr){
        if(answerArr.includes(guessArr[letter])){
            // determine if this is a duplicate letter we've already had.
            if(letterObj[guessArr[letter]]==undefined){
                letterObj[guessArr[letter]]={
                    count:1
                }
                correctLetters++;
            } else {
                 // if it is a duplicate letter, see if the answer has more than one copy of it
                 letterObj[guessArr[letter]].count ++;

                 if(letterObj[guessArr[letter]].count <= ansLetterObj[guessArr[letter]].count){
                     correctLetters++;
                 }

            }
           
        }
    }

    return correctLetters;
}

function locationCheckFunc(guess){
    let guessArr = guess.split('');
    let answerArr = randomWord.split('');
    let correctLetters = 0;

    if(guessArr.length <= answerArr.length){
        for(let letter in guessArr){
            if(guessArr[letter]==answerArr[letter]){
                correctLetters++;
            }
        }
    } else {
        for(let letter in answerArr){
            if(answerArr[letter]==guessArr[letter]){
                correctLetters++;
            }
        }
    }
    return correctLetters;
}

function tryAgain(){
    event.preventDefault();
    randomWord = passphrases[Math.floor(Math.random() * passphrases.length)];
    numberOfGuesses = 0;
    $("#guess").prop('disabled', false);
    $('#guess').val('');
    $('.subBtn').html(`
        <button id="phraseBtn" onclick="phraseSub()">Guess</button>
        <button id="giveUpBtn" onclick="giveUp()">Give Up</button>
    `);
    $('#answerBox').html(``);
    $("#seconds").html('00');
    $("#minutes").html('00');
    sec = 0;
    timer = setInterval( function(){
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}

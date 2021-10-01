let randomWord = passphrases[Math.floor(Math.random() * passphrases.length)];

// makes a password using the passphrases array
function phraseSub(){
    event.preventDefault();
    let answerText = ``;
    let guess = $("#guess").val();
    let lengthCheck = 'incorrect';

    if(guess.length == randomWord.length){
        lengthCheck = 'correct';
    } else {
        lengthCheck = 'incorrect';
    }

    let letterCheck = letterCheckFunc(guess);
    
    console.log(randomWord)

    if(guess == randomWord){
        $("#guess").prop('disabled', true);
        answerText = `That is correct!`
    } else {
        $('#guess').val('');
        answerText += `<p>Your guess was '${guess}'.</p>`;
        answerText += `<p>That is incorrect.</p>`;
        answerText += `<p>You word is the ${lengthCheck} length.</p>`;
        answerText += `<p>You have ${letterCheck} correct letters.</p>`;
    }

    $('#answerBox').html(`
        ${answerText}
    `);
};

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


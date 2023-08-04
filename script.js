document.addEventListener("DOMContentLoaded", function () {
    const wordList = ["APPLE", "BANANA", "CHERRY", "DATES", "FIGS", "GRAPE", "KIWI", "LEMON", "MANGO", "ORANGE"];
    const secretWord = chooseSecretWord(wordList);
  
    const startButton = document.getElementById("startButton");
    const guessButton = document.getElementById("guessButton");
    const guessInput = document.getElementById("guessInput");
    const lettersContainer = document.getElementById("letters");
    const result = document.getElementById("result");
  
    let attempts = 0;
    const maxAttempts = 6;
  
    startButton.addEventListener("click", function () {
      startButton.disabled = true;
      guessInput.disabled = false;
      guessButton.disabled = false;
      renderLetterInputs();
    });
  
    guessButton.addEventListener("click", function () {
      const guess = guessInput.value.toUpperCase();
      attempts++;
  
      if (guess.length !== 5) {
        result.textContent = "Invalid guess. Please enter a 5-letter word.";
        return;
      }
  
      const evaluation = evaluateGuess(secretWord, guess);
      result.textContent = evaluation;
  
      if (guess === secretWord) {
        result.style.color = "green";
        result.textContent = `Congratulations! You guessed the word '${secretWord}' in ${attempts} attempts.`;
        disableGame();
      } else if (attempts === maxAttempts) {
        result.style.color = "red";
        result.textContent = `Sorry, you've run out of attempts. The secret word was '${secretWord}'.`;
        disableGame();
      }
  
      renderLetterInputs();
    });
  
    function chooseSecretWord(wordList) {
      return wordList[Math.floor(Math.random() * wordList.length)];
    }
  
    function evaluateGuess(secretWord, guess) {
      let result = "";
  
      for (let i = 0; i < secretWord.length; i++) {
        if (guess[i] === secretWord[i]) {
          result += '<div class="letter letter-correct">' + guess[i] + '</div>';
        } else if (secretWord.includes(guess[i])) {
          result += '<div class="letter letter-wrong">' + guess[i] + '</div>';
        } else {
          result += '<div class="letter">' + guess[i] + '</div>';
        }
      }
  
      return result;
    }
  
    function renderLetterInputs() {
      lettersContainer.innerHTML = "";
  
      for (let i = 0; i < 5; i++) {
        const input = document.createElement("input");
        input.className = "letter";
        input.type = "text";
        input.maxLength = 1;
        lettersContainer.appendChild(input);
      }
    }
  
    function disableGame() {
      guessInput.disabled = true;
      guessButton.disabled = true;
    }
  });
  
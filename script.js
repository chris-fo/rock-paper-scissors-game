// define constants
const ROCK = 'Rock', PAPER = 'Paper', SCISSORS = 'Scissors';
const choices = [ROCK, PAPER, SCISSORS];
const WIN = 0, TIE = 1, LOSS = 2;
// define needed variables and elements
const buttons = document.querySelectorAll('.selection-btn');
const results = document.querySelector('.results');
const playAgain = document.querySelector('#play-again');
const paragraph = document.createElement('p');
const resultParagraph = document.createElement('p');
const score = document.querySelector('.score');
let rounds = 1;
let computerScore = 0;
let playerScore = 0;
// Welcome message
console.log('Welcome to Rock-Paper-Scissors');
score.textContent = `Player ${playerScore} : Computer ${computerScore}`
// function, that determines choice of the computer
let computerPlay = () => choices[Math.floor(Math.random()*3)];

// function to play a round of rock - paper - scissors 
function playRound (playerSelection = '', computerSelection = '') {
  let result;
  // determine winner
  if (playerSelection === ROCK) {
    // player chose rock
    if (computerSelection === ROCK) {
      // rock vs rock
      result = TIE;
    } else if (computerSelection === PAPER) {
      // rock vs paper
      computerScore++;
      result = LOSS;
    } else {
      // rock vs scissors
      playerScore++;
      result = WIN;
    }
  } else if (playerSelection === PAPER) {
    // player chose paper
    if (computerSelection === ROCK) {
      // paper vs rock
      playerScore++;
      result = WIN;
    } else if (computerSelection === PAPER) {
      // paper vs paper
      result = TIE;
    } else {
      // paper vs scissors
      computerScore++;
      result = LOSS;
    }
  } else {
    // player chose scissors
    if (computerSelection === ROCK) {
      // scissors vs rock
      computerScore++;
      result = LOSS;
    } else if (computerSelection === PAPER) {
      // scissors vs paper
      playerScore++;
      result = WIN;
    } else {
      // scissors vs scissors
      return TIE;
    }
  }
  paragraph.textContent = announceResult(result, playerSelection, computerSelection);
  results.appendChild(paragraph);

  score.textContent = `Player ${playerScore} : Computer ${computerScore}`
} 

function announceResult(result, playerSelection, computerSelection) {
  switch (result) {
    case WIN: {
      return `${playerSelection} beats ${computerSelection}! You win this round!`;
      break;
    }
    case TIE: {
      return `${playerSelection} versus ${computerSelection}! It\'s a tie.`;
      break;
    }
    case LOSS: {
      return `${computerSelection} beats ${playerSelection}!You lose this round!`;
    }
  }
}

function processResult(result) {
  // no point if TIE
  if (result === LOSS) {
    computerPlay++;
  } else if (result === WIN) {
    playerScore ++;
  }
  if (playerScore === 5 || computerScore === 5) {
    if (playerScore > computerScore) resultParagraph.textContent = `You won! Final Score: ${playerScore} to ${computerScore}.`
    else if (computerScore > playerScore) resultParagraph.textContent = `You lost! Final Score: ${playerScore} to ${computerScore}.`
    else resultParagraph.textContent = `Tie! Final Score: ${playerScore} to ${computerScore}.`
    resultParagraph.classList.add('result');
    results.appendChild(resultParagraph);
    playAgain.classList.toggle('hidden');
    buttons.forEach( button => {
      button.disabled = true;
    })
  }
}

buttons.forEach( 
  (button) => { 
    console.log(button.value);
    button.addEventListener('click', (e) => { 
      console.log(e.target.value);
      const result = (playRound(e.target.value, computerPlay()));
      processResult(result);
      rounds++;
    });
  }
);

playAgain.addEventListener('click', (e) =>{
  paragraph.textContent = '';
  resultParagraph.textContent = '';
  results.removeChild(paragraph);
  results.removeChild(resultParagraph);
  playerScore=0;
  computerScore = 0;
  rounds = 1;
  playAgain.classList.toggle('hidden');
  buttons.forEach( button => {
    button.disabled = false;
  })
  score.textContent = `Player ${playerScore} : Computer ${computerScore}`;
})

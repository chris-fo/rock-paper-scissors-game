// define constants
const ROCK = 'Rock', PAPER = 'Paper', SCISSORS = 'Scissors';
const choices = [ROCK, PAPER, SCISSORS];
const WIN = 0, TIE = 1, LOSS = 2;
// Welcome message
console.log('Welcome to Rock-Paper-Scissors');
// function, that determines choice of the computer
let computerPlay = () => choices[Math.floor(Math.random()*3)];
// function to play a round of rock - paper - scissors 
function playRound (playerSelection = '', computerSelection = '') {
  // check input
  if (!choices.includes(playerSelection)) {
    console.log('Invalid player choice! Computer wins this round.');
    return LOSS;
  }
  // determine winner
  if (playerSelection === ROCK) {
    // player chose rock
    if (computerSelection === ROCK) {
      // rock vs rock
      return TIE;
    } else if (computerSelection === PAPER) {
      // rock vs paper
      return LOSS;
    } else {
      // rock vs scissors
      return WIN;
    }
  } else if (playerSelection === PAPER) {
    // player chose paper
    if (computerSelection === ROCK) {
      // paper vs rock
      return WIN;
    } else if (computerSelection === PAPER) {
      // paper vs paper
      return TIE;
    } else {
      // paper vs scissors
      return LOSS;
    }
  } else {
    // player chose scissors
    if (computerSelection === ROCK) {
      // scissors vs rock
      return LOSS;
    } else if (computerSelection === PAPER) {
      // scissors vs paper
      return WIN;
    } else {
      // scissors vs scissors
      return TIE;
    }
  }
} 

function game() {
  let playerScore = 0;
  let computerScore = 0;
  for (let i=0; i<5; i++) {
    let computerSelection = computerPlay();
    let playerSelection = window.prompt('Please enter your choice of rock, paper or scissors:');
    // sanitize input
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.substring(1).toLowerCase();
    let result = playRound(playerSelection, computerSelection);
    switch (result) {
      case WIN: {
        console.log(`You win this round! ${playerSelection} beats ${computerSelection}.`);
        playerScore++;
        break;
      }
      case TIE: {
        console.log(`Double ${playerSelection}! It\'s a tie.`);
        playerScore++;
        computerScore++;
        break;
      }
      case LOSS: {
        console.log(`You lose this round! ${computerSelection} beats ${playerSelection}.`);
        computerScore++;
      }
    }
  }
  console.log(`Player: ${playerScore} - Computer: ${computerScore}`);
  console.log(playerScore > computerScore ? 'You won!' : ( playerScore===computerScore ? 'Tie!' : 'You lost!'));
}

game();

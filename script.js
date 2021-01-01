/* Author Manan Bari */
// Game Black Jack

//card variables
let suits = [ 'Hearts ❤️', 'Clubs ♣️', 'Diamonds ♦️', 'Spades ♠️'];
let values = [ 'Ace', 'King', 'Queen','Jack',
  'ten','nine','eight','seven','six','five','four',
  'three','two'
];



// dom variables
let textarea = document.getElementById('text-area');
  // this works only outside of textarea tag
let winMessage = document.getElementById('win-message');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');


// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];




// hiding buttons
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

// seting up event handler onclick

  //this one is newgame button handler
newGameButton.addEventListener('click',()=>{
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [ getNextCard(), getNextCard() ];
    playerCards = [ getNextCard(), getNextCard() ];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    winMessage.innerText = '';
    showStatus();
});

  // this one is hit button handler
hitButton.addEventListener('click', ()=> {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

  // this one is for stay button handler
stayButton.addEventListener('click',()=>{
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

const createDeck = () => {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueidx = 0 ; valueidx < values.length ; valueidx++) {
      let card = {
        suit : suits[suitIdx],
        value : values[valueidx]
      }
      deck.push(card);
    }
  }
  return deck;
}

const shuffleDeck = () => {
  for ( let i= 0 ; i<deck.length; i++ ) {
    let swapIdx = Math.trunc(Math.random()* deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i]
    deck[i] = tmp;
  }
}

const getcardstring = (card) => {
  return card.value + ' of '  +  card.suit;
}

const getNextCard = () => {
  return deck.shift();
}



// showstatus methods or gameRunning methods
function getcardNumaricValue(card) {
  switch(card.value){
    case 'Ace':
      return 1;
    case 'two':
      return 2;
    case 'three': 
      return 3;
    case 'four':
      return 4;
    case 'five':
      return 5;
    case 'six':
      return 6;
    case 'seven':
      return 7;
    case 'eight':
      return 8;
    case 'nine':
      return 9;
    default:
      return 10;
  }
}


let getScore = (cardArray) => {
  let score = 0;
  let hasAce= false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getcardNumaricValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}
let updateScores = () => {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}


let checkForEndOfGame = () => {
  //TODO
  updateScores();
  if (gameOver) {
    //let dealer take cards
    while(dealerScore < playerScore
      && playerScore <=21
      && dealerScore <=21) {
    dealerCards.push(getNextCard());
    updateScores();
      }
  }
    // let's check who wins
  if (playerScore >21 ) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore >21 ) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {

    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
  }
}


// show status function
function showStatus() {
  if (!gameStarted) {
    textarea.innerText = 'Welcome to Black jack! ';
    // winMessage.innerText = '';
    return;
  }

  // initilize dealer and player card
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getcardstring(dealerCards[i]) + '\n';
  };

  let playerCardString = '';
  for (let i = 0 ; i < playerCards.length; i++) {
    playerCardString += getcardstring(playerCards[i]) + '\n';
  };
  //printing dealer and player card 
  updateScores();
  textarea.innerText = 
  //computer = dealer
  '🤖 Computer has:\n' +
  dealerCardString +
  '(score: '+ dealerScore + ')\n\n' +

  '🦸‍♂️ Player has:\n' +
  playerCardString + 
  'score: '+ playerScore + ')\n\n' ;

if (gameOver) {
  if (playerWon) {
    winMessage.innerText += "YOU WINS!";
  } 
  else {
    winMessage.innerText += "DEALER WINS!";
  }
  newGameButton.style.display = 'inline';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  }

  // print whole deck of cards
  // for(var i = 0 ; i < deck.length; i++) {
  //   textarea.innerText += '\n' + getcardstring(deck[i])
  // }
}
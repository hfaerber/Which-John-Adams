var playGameBtn = document.getElementById('play-game-button-js');
var directionsPagePlayBtn = document.querySelector('.directions-page-play-button');
var p1InputField = document.getElementById('player1');
var errorMsgP1 = document.getElementById('error-P1');
var formView = document.querySelector('.hide-able-form');
var directionsView = document.querySelector('.game-directions');
var p1NameSpan = document.querySelector('.p1-name');
var p1AsideNameSpan = document.querySelector('.p1-aside-name');
var winnerName = document.getElementById('winner-name');
var cardsView = document.querySelector('.hide-able-cards');
var cards = document.querySelectorAll('.card');
var playArea = document.querySelector('.play-area');
// var asides = document.querySelectorAll('.aside');
var p1MatchCount = document.querySelector('.p1-match-count');
var globalDecks = [];
var winnerView = document.querySelector('.hide-able-winner-page')

playGameBtn.addEventListener('click', clickPlayGameBtn);
directionsPagePlayBtn.addEventListener('click', clickDirPageBtn);
playArea.addEventListener('click', clickCard);

// EVENT HANDLERS

function clickPlayGameBtn() {
  player1Name = p1InputField.value;
  if (p1InputField.value.length === 0) {
    errorMsgP1.innerText = 'Error! Please enter name.'
  } else {
    toggleMiddleView(formView, directionsView);
    updateSpan(player1Name);
  }
}

function clickDirPageBtn() {
  toggleMiddleView(directionsView, cardsView);
  toggleAsideView();
  instantiateDeck();
  countMatches();
}

function clickCard(event) {
  if (event.target.classList.contains('card') && globalDecks[0].selectedCards.length < 2) {
    flipCardPhotoUp();
    addToSelectedCards();
    if (globalDecks[0].selectedCards.length === 2) {
      runIfMatch();
    }
  } else if (event.target.classList.contains('photo')) {
      flipCardPhotoDown();
      removeFromSelectedCards();
    }
}

function flipCardPhotoUp() {
  event.target.src = event.target.dataset.imgsrc;
  event.target.classList.remove('card');
  event.target.classList.add('photo');
}

function addToSelectedCards() {
  var arrayOfCards = globalDecks[0].cards;
  for (var i = 0; i < arrayOfCards.length; i++) {
    if (arrayOfCards[i].id === event.target.dataset.cardid) {
      globalDecks[0].selectedCards.push(arrayOfCards[i]);
    }
  }
}

function flipCardPhotoDown() {
  event.target.src = 'assetsja/j-card.png.jpg';
  event.target.classList.remove('photo');
  event.target.classList.add('card');
}

function removeFromSelectedCards() {
  function wasClicked(element) {
    return element.id === event.target.id;
  }
  var indexToSplice = globalDecks[0].selectedCards.findIndex(wasClicked);
  globalDecks[0].selectedCards.splice(indexToSplice, 1);
}

function runIfMatch() {
  if (globalDecks[0].checkSelectedCards() === true) {
    hideBothCards();
    globalDecks[0].moveToMatched();
    countMatches();
  }
}

function hideBothCards() {
  var firstCardId = globalDecks[0].selectedCards[0].id;
  var firstCard = document.getElementById(`${firstCardId}`);
  firstCard.classList.add('hide-aside');
  var secondCardId = globalDecks[0].selectedCards[1].id;
  var secondCard = document.getElementById(`${secondCardId}`);
  secondCard.classList.add('hide-aside');
}

function instantiateCards(cards) {
  var instantiatedCards = [];
  for (var i = 0; i < cards.length; i++) {
    var cardId = cards[i].dataset.cardid;
    var matchId = cards[i].dataset.matchid;
    var card = new Card(cardId, matchId);
    instantiatedCards.push(card);
  }
  return instantiatedCards;
}

function instantiateDeck() {
  var deckId = Date.now();
  var instCards = instantiateCards(cards);
  var deck = new Deck(deckId, instCards);
  globalDecks.unshift(deck);
}

// SRP FUNCTIONS TO INVOKE IN HANDLERS

function toggleMiddleView(hidden, displayed) {
  hidden.classList.add('hide-it');
  displayed.classList.remove('hide-it');
}

function toggleAsideView() {
  var asides = document.querySelectorAll('.aside');
  for (var i = 0; i < asides.length; i++) {
    if (asides[i].classList.contains('hide-aside')) {
      asides[i].classList.remove('hide-aside');
    } else {
    asides[i].classList.add('hide-aside');
    }
  }
}

function updateSpan(name) {
  name = name.toUpperCase();
  p1NameSpan.innerText = `${name}`;
  p1AsideNameSpan.innerText = `${name}`;
}

function countMatches() {
  if (globalDecks[0].matches === 5) {
    showWinnerPage(p1AsideNameSpan.innerText);
  } else {
    p1MatchCount.innerText = globalDecks[0].matches;
  }
}

function showWinnerPage(name) {
  toggleMiddleView(cardsView,winnerView);
  toggleAsideView();
  winnerName.innerText = `${name}`;
  // querySelect #win-time and put in however long it took to get all 5 matches
  // will need to start timer on first card click and end it on 5th match.
}

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
var p1MatchCount = document.querySelector('.p1-match-count');
var globalDecks = [];
var cardPhotos = ['assetsja/hboja.jpg', 'assetsja/hboja.jpg', 'assetsja/ja.jpg',
'assetsja/ja.jpg', 'assetsja/jqa.jpg', 'assetsja/jqa.jpg', 'assetsja/statue.jpg',
'assetsja/statue.jpg', 'assetsja/ourja.jpg', 'assetsja/ourja.jpg'];
var winnerView = document.querySelector('.hide-able-winner-page')
var startTime;
var endTime;


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
  applyCardHTML(globalDecks[0].cards);
  countMatches();
  startTimer();
  // shoudl be able to remove startTimer bc the deck id is this. (or remove deck.id)
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

function startTimer() {
  startTime = Date.now();
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
  event.target.src = 'assetsja/j-card.png';
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

function instantiateCards(cardPhotos) {
  var instantiatedCards = [];
  for (var i = 0; i < cardPhotos.length; i++) {
    var cardId = i
    var matchInfo = cardPhotos[i]
    var card = new Card(cardId, matchInfo);
    instantiatedCards.push(card);

  // for (var i = 0; i < cards.length; i++) {
  //   var cardId = cards[i].dataset.cardid;
  //   var matchInfo = cards[i].dataset.matchid;
    // var card = new Card(cardId, matchInfo);
    // instantiatedCards.push(card);
  }
  return instantiatedCards;
}

function instantiateDeck() {
  var deckId = Date.now();
  var instCards = instantiateCards(cardPhotos);
  var deck = new Deck(deckId, instCards);
  globalDecks.unshift(deck);
  // shuffle deck cards
}

function applyCardHTML(instCards) {
  for (var i = 0; i < instCards.length; i++) {
    var htmlToAdd = `<img data-cardid="${instCards[i].id}"
    data-imgsrc="${instCards[i].matchInfo}"
    class="card j-card" id="${instCards[i].id}" src="assetsja/j-card.png"
    alt="back of card with letter j">`;
// does this html even need a regular id?  giving the same as dataset cardit just in case
    cardsView.insertAdjacentHTML('afterbegin', htmlToAdd);
    // do i need to run some kind of function to affect layout? masonry?
  }
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
    endTime = Date.now();
    calcTimeItTook();
    showWinnerPage(p1AsideNameSpan.innerText);
  } else {
    p1MatchCount.innerText = globalDecks[0].matches;
  }
}

function calcTimeItTook() {
  var timeMillisecs = endTime - startTime;
  var roundedTimeSecs = Math.round((timeMillisecs / 1000) * 100)/100;
  var roundedTimeMins = Math.round(roundedTimeSecs / 60);
  var remainderSecs = roundedTimeSecs % 60;
  var winMin = document.getElementById('win-min');
  var winSec = document.getElementById('win-sec');
  winMin.innerText = roundedTimeMins;
  winSec.innerText = Math.round(remainderSecs * 100)/100;
}

function showWinnerPage(name) {
  toggleMiddleView(cardsView,winnerView);
  toggleAsideView();
  winnerName.innerText = `${name}`;
}

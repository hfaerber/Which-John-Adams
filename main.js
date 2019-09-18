var playGameBtn = document.getElementById('play-game-button-js');
var directionsPagePlayBtn = document.querySelector('.directions-page-play-button');
var navMenuIcon = document.querySelector('.nav-icon');
// var p1InputField = document.getElementById('player1');
// var errorMsgP1 = document.getElementById('error-P1');
var formView = document.querySelector('.hide-able-form');
var directionsView = document.querySelector('.game-directions');
var p1NameSpan = document.querySelector('.p1-name');
var p1AsideNameSpan = document.querySelector('.p1-aside-name');
var cardsView = document.querySelector('.hide-able-cards');
var playArea = document.querySelector('.play-area');
var p1MatchCount = document.getElementById('p1-match-count');
var globalDecks = [];
var winners = getFromLS() || [];
var cardPhotos = ['assetsja/john-adams-from-hbo-series.jpg', 'assetsja/john-adams-from-hbo-series.jpg', 'assetsja/president-john-adams.jpg',
'assetsja/president-john-adams.jpg', 'assetsja/john-quincy-adams.jpg', 'assetsja/john-quincy-adams.jpg', 'assetsja/statue-of-john-adams.jpg',
'assetsja/statue-of-john-adams.jpg', 'assetsja/our-friend-john-adams.jpg', 'assetsja/our-friend-john-adams.jpg'];
var winnerView = document.querySelector('.hide-able-winner-page')
var startTime;
var endTime;

playGameBtn.addEventListener('click', clickPlayGameBtn);
directionsPagePlayBtn.addEventListener('click', clickDirPageBtn);
cardsView.addEventListener('click', clickCard);
navMenuIcon.addEventListener('click', clickNavMenu);
winnerView.addEventListener('click', clickWinnerPageBtn);


// EVENT HANDLERS

function clickPlayGameBtn() {
  var p1Name = document.getElementById('player1').value.trim().toUpperCase();
  var p2Name = document.getElementById('player2').value.trim().toUpperCase();
  if (p1Name.length === 0) {
    document.getElementById('error-P1').innerText = 'Error! Please enter name.'
  }
  if (p2Name.length === 0) {
    document.getElementById('error-P2').innerText = 'Error! Please enter name.'
  } else {
    toggleMiddleView(formView, directionsView);
    savePlayerName(p1Name);
    updateSpan(getPlayerName());
  }
}

function getPlayerName() {
  var retrievedName = localStorage.getItem('P1Name');
  return retrievedName;
}

function clickDirPageBtn() {
  toggleMiddleView(directionsView, cardsView);
  toggleAsideView();
  instantiateDeck();
  globalDecks[0].shuffle();
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

function clickNavMenu() {
  var winnerBoard = document.querySelector('.winner-board');
  if (winnerBoard.classList.contains('hide-it')) {
    winnerBoard.classList.remove('hide-it');
  } else {
    winnerBoard.classList.add('hide-it');
  }
  updateWinnerBoard();
}

function clickWinnerPageBtn() {
  if (event.target.id === ('new-game-btn')) {
    location.reload();
  }
}

function startTimer() {
  startTime = Date.now();
}

function flipCardPhotoUp() {
  event.target.src = event.target.dataset.imgsrc;
  event.target.alt = `photo of ${event.target.dataset.imgsrc}`;
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
  event.target.alt = 'back of card with letter j';
  event.target.classList.remove('photo');
  event.target.classList.add('card');
}

function flipBothCardsDown() {
  var flippedCards = document.querySelectorAll('.photo');
  for (var i = 0; i < flippedCards.length; i++) {
    flippedCards[i].src = 'assetsja/j-card.png';
    flippedCards[i].alt = 'back of card with letter j';
    flippedCards[i].classList.remove('photo');
    flippedCards[i].classList.add('card');
  }
}

function removeFromSelectedCards() {
  function wasClicked(element) {
    return element.id === event.target.id;
  }
  var indexToSplice = globalDecks[0].selectedCards.findIndex(wasClicked);
  globalDecks[0].selectedCards.splice(indexToSplice, 1);
}

function runIfMatch() {
  setTimeout(function(){
    if (globalDecks[0].checkSelectedCards() === true) {
      hideBothCards();
      globalDecks[0].moveToMatched();
      countMatches();
    } else {
      flipBothCardsDown();
      globalDecks[0].selectedCards = [];
    }
  }, 1000);
  // was 1500 but changed for development only
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
  var cardId = i.toString();
    var matchInfo = cardPhotos[i]
    var card = new Card(cardId, matchInfo);
    instantiatedCards.push(card);
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
  p1NameSpan.innerText = `${name}`;
  p1AsideNameSpan.innerText = `${name}`;
}

function savePlayerName(name) {
  localStorage.setItem("P1Name", name);
}

function countMatches() {
  if (globalDecks[0].matches === 5) {
    endTime = Date.now();
    calcTimeItTook();
    showWinnerPage(getPlayerName());
  } else {
    p1MatchCount.innerText = globalDecks[0].matches;
  }
}

function calcTimeItTook() {
  var timeMillisecs = endTime - startTime;
  var roundedTimeSecs = Math.round((timeMillisecs / 1000) * 100)/100;
  var roundedTimeMins = Math.round(roundedTimeSecs / 60);
  var remainderSecs = Math.round((roundedTimeSecs % 60) * 100)/100;
  var winTime = document.getElementById('win-time');
  var winTimeDisplay = `${roundedTimeMins} min ${remainderSecs} sec`;
  winTime.innerText = winTimeDisplay;
  var timesForLS = [timeMillisecs, winTimeDisplay];
  return timesForLS;
}

function showWinnerPage(name) {
  var winnerName = document.getElementById('winner-name');
  toggleMiddleView(cardsView,winnerView);
  toggleAsideView();
  winnerName.innerText = `${name}`;


  var timesForLS = calcTimeItTook();
  var winnerStats = {winner: name, time: timesForLS[0], displaytime: timesForLS[1]};
  winners.push(winnerStats);
  saveToLS();
}

function saveToLS() {
  var stringifiedWinners = JSON.stringify(winners);
  localStorage.setItem('winnersList', stringifiedWinners);
}

function getFromLS() {
  if ('winnersList' in localStorage) {
    var retrievedWinners = localStorage.getItem('winnersList');
    var parsedWinners = JSON.parse(retrievedWinners);
    console.log(parsedWinners);
    return parsedWinners;
  }
}

function updateWinnerBoard() {
  winners.sort(function(a,b) {
    return a.time - b.time;
  });
  var winnerNames = document.querySelectorAll('.winner-board-name');
  var displayTimes = document.querySelectorAll('.winner-board-time');
  if (winners.length < 5) {
    for (var i = 0; i < winners.length; i++) {
      winnerNames[i].innerText = winners[i].winner;
      winnerNames[i].classList.remove('hide-aside');
      displayTimes[i].innerText = winners[i].displaytime;
      displayTimes[i].classList.remove('hide-aside');
    }
  } else {
    for (var i = 0; i < 5; i++) {
      winnerNames[i].innerText = winners[i].winner;
      winnerNames[i].classList.remove('hide-aside');
      displayTimes[i].innerText = winners[i].displaytime;
      displayTimes[i].classList.remove('hide-aside');
    }
  }
}

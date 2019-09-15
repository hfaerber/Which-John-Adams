var playGameBtn = document.getElementById('play-game-button-js');
var directionsPagePlayBtn = document.querySelector('.directions-page-play-button');
var p1InputField = document.getElementById('player1');
var errorMsgP1 = document.getElementById('error-P1');
var formView = document.querySelector('.hide-able-form');
var directionsView = document.querySelector('.game-directions');
var p1NameSpan = document.querySelector('.p1-name');
var p1AsideNameSpan = document.querySelector('.p1-aside-name');
var cardsView = document.querySelector('.hide-able-cards');
var cards = document.querySelectorAll('.card');
var playArea = document.querySelector('.play-area');
var asides = document.querySelectorAll('.aside');
var p1MatchCount = document.querySelector('.p1-match-count');
var globalDecks = [];

playGameBtn.addEventListener('click', clickPlayGameBtn);
directionsPagePlayBtn.addEventListener('click', clickDirPageBtn);
playArea.addEventListener('click', clickBackOfCard);

// EVENT HANDLERS

function clickPlayGameBtn() {
  player1Name = p1InputField.value;
  if (p1InputField.value.length === 0) {
    errorMsgP1.innerText = 'Error! Please enter name.'
  } else {
    toggleMiddleView(formView, directionsView);
    updateSpan(player1Name);
  }
  // make it so that it can't be blank spacing and still work
}

function clickDirPageBtn() {
  toggleMiddleView(directionsView, cardsView);
  toggleAsideView(asides);
  // instantiateCards(cards);
  instantiateDeck();
  countMatches();
}

function clickBackOfCard(event) {
  // could call this pickTwoCards
  if (event.target.classList.contains('card') && globalDecks[0].selectedCards.length < 2) {
    event.target.src = event.target.dataset.imgsrc;
    var arrayOfCards = globalDecks[0].cards;
    for (var i = 0; i < arrayOfCards.length; i++) {
      if (arrayOfCards[i].id === event.target.dataset.cardid) {
        globalDecks[0].selectedCards.push(arrayOfCards[i]);
    }
  }
  if (globalDecks[0].selectedCards.length === 2) {
    runIfMatch();
  }
  }
}

// function runIfMatch() {
//   if (globalDecks[0].selectedCards.length === 2 && globalDecks[0].checkSelectedCards() === true) {
//     hideBothCards();
//     globalDecks[0].moveToMatched();
//     countMatches();
//   }
// }

function runIfMatch() {
  if (globalDecks[0].checkSelectedCards() === true) {
    hideBothCards();
    globalDecks[0].moveToMatched();
    countMatches();
  } else {
    for (var i = 0; i < globalDecks[0].selectedCards.length; i++) {
      var flippedCard = document.getElementById(`${globalDecks[0].selectedCards[i].id}`);
      flippedCard.addEventListener('click', clickFrontOfCard);
    }
  }
}

// THE BELOW FUNCTION IS THE FUNCTIONALITY I AM STUCK ON.  TRIED MANY THINGS.  MOST WORK TO SOME
// DEGREE BUT NONE WORK FULLY.

var counter = 0;

function clickFrontOfCard(event) {
// if (this.selected = true)
  if (counter < 2) {
    event.target.src = 'assetsja/j-card.png.jpg';
    counter++;
    console.log(counter);
  }
  if (counter >= 2) {
    globalDecks[0].selectedCards = [];
    counter = 0;
  }
}

// THE FUNCTIONALITY BELOW DIDN'T WORK BECAUSE IT CHANGED THE ARRAY LENGTH TOO SOON
  // remove from selectCards arrayOfCards
  // function wasClicked(element) {
  //   return element.id === event.target.id;
  // }
  // var indexToSplice = globalDecks[0].selectedCards.findIndex(wasClicked);
  // globalDecks[0].selectedCards.splice(indexToSplice, 1);


function hideBothCards() {
  var firstCardId = globalDecks[0].selectedCards[0].id;
  var firstCard = document.getElementById(`${firstCardId}`);
  firstCard.classList.add('hide-aside');
  var secondCardId = globalDecks[0].selectedCards[1].id;
  var secondCard = document.getElementById(`${secondCardId}`);
  secondCard.classList.add('hide-aside');
}

// **i could make this compare the matched boolean of each card

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
  // does this function need to return anything? not if i'm not using the deck yet
}
  // do i want to reassign the global array to the instantiated version of itself?
// decided to create local array of instantiatedCards instead and return it
// not sure yet if i need lines 47 52 and 54.  we'll see.
// could I just documentQSAll the cards within the first line of this function?
// if i do the cards arr locally i wouldnt need to pass through and arg.


// PSUEDO-CODING


// SRP FUNCTIONS TO INVOKE IN HANDLERS

function toggleMiddleView(hidden, displayed) {
  // element.hidden = !element.hidden;
  hidden.classList.add('hide-it');
  displayed.classList.remove('hide-it');
}

function toggleAsideView(asides) {
  for (var i = 0; i < asides.length; i++) {
    asides[i].classList.remove('hide-aside');
  }
}

function updateSpan(name) {
  name = name.toUpperCase();
  p1NameSpan.innerText = `${name}`;
  p1AsideNameSpan.innerText = `${name}`;
}

function countMatches() {
  p1MatchCount.innerText = globalDecks[0].matches;
}

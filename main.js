var playGameBtn = document.getElementById('play-game-button-js');
var directionsPagePlayBtn = document.querySelector('.directions-page-play-button');
var p1InputField = document.getElementById('player1');
var errorMsgP1 = document.getElementById('error-P1');
var formView = document.querySelector('.hide-able-form');
var directionsView = document.querySelector('.game-directions');
var p1NameSpan = document.querySelector('.p1-name');
var cardsView = document.querySelector('.hide-able-cards');
var cards = document.querySelectorAll('.card');
var playArea = document.querySelector('.play-area');


playGameBtn.addEventListener('click', clickPlayGameBtn);
directionsPagePlayBtn.addEventListener('click', clickDirPageBtn);
playArea.addEventListener('click', clickBackOfCard);

// EVENT HANDLERS

function clickPlayGameBtn() {
  player1Name = p1InputField.value;
  if (p1InputField.value.length === 0) {
    errorMsgP1.innerText = 'Error! Please enter name.'
  } else {
    toggleView(formView, directionsView);
    updateSpan(player1Name);
  }
  // make it so that it can't be blank spacing and still work
}

function clickDirPageBtn() {
// instantiate cards (what args?)
// to inst and give arg data i think i need a global array
// with each card so I can instantiate them within a for loop that goes through
// each one and pulls the dataset info to pass through as the arg so it can live
// within the properties in the data model.


// instantiate deck (what args?)

// put cards in global array

// put global array in the deck data model

  toggleView(directionsView, cardsView);
  // instantiateCards(cards);
  instantiateDeck();
  // this is kind of running the card instantiation twice isn't it?
  // running it first then again within the instantiateDeck() function call?
}

function clickBackOfCard(event) {
  if (event.target.classList.contains('card')) {
    event.target.src = event.target.dataset.imgsrc;
    // change that cards' img src;
  }
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
  // does this function need to return anything? not if i'm not using the deck yet
}
  // do i want to reassign the global array to the instantiated version of itself?
// decided to create local array of instantiatedCards instead and return it
// not sure yet if i need lines 47 52 and 54.  we'll see.
// could I just documentQSAll the cards within the first line of this function?
// if i do the cards arr locally i wouldnt need to pass through and arg.


// PSUEDO-CODING
// i probs want to instantiate my cards on the dirplaybtn click
// and put them into a global array of cards
// and instantiate a Deck
// and put the new arr of instantiated cards into that decks data model
//
// I want:
// the card to diplay its john adams image
// when the user clicks on it.
// use event.target to say if the click happen on this card,
// change this cardssrc to other img src.



// SRP FUNCTIONS TO INVOKE IN HANDLERS

function toggleView(hidden, displayed) {
  // element.hidden = !element.hidden;
  hidden.classList.add('hide-it');
  displayed.classList.remove('hide-it');
}

function updateSpan(name) {
  // make name uppercase
  p1NameSpan.innerText = `${name}`;

}

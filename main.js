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
// instantiate cards (what args?)
// to inst and give arg data i think i need a global array
// with each card so I can instantiate them within a for loop that goes through
// each one and pulls the dataset info to pass through as the arg so it can live
// within the properties in the data model.


// instantiate deck (what args?)

// put cards in global array

// put global array in the deck data model

  toggleMiddleView(directionsView, cardsView);
  toggleAsideView(asides);
  // instantiateCards(cards);
  instantiateDeck();
  countMatches();
  // this is kind of running the card instantiation twice isn't it?
  // running it first then again within the instantiateDeck() function call?
}

function clickBackOfCard(event) {
  if (event.target.classList.contains('card') && globalDecks[0].selectedCards.length < 2) {
    event.target.src = event.target.dataset.imgsrc;
    var arrayOfCards = globalDecks[0].cards;
    for (var i = 0; i < arrayOfCards.length; i++) {
      if (arrayOfCards[i].id === event.target.dataset.cardid) {
        globalDecks[0].selectedCards.push(arrayOfCards[i]);
      }
    }
  }
}
// i want to make the below stuff happen only twice.
// use selected cards in deck
// wait could i just add a this.selected to the cards and change it on click
// compare event.target.dataset.cardid ===
// globalDecks[0].cards which is an array so it could forloop through look
// for the card.id.
// if the card.id matches the event.target.dataset.cardid,
// push it into the deck.selectedCards array which will only ever have 0 and 1 index.
// because we only want the above to happen if the selected cards array.length <2.
//
// if (globalDecks[0].selectedCards.length < 2 {
//   change img,
//   then loop through deckcards array and push the selected on into deck.selected
// }

    // push that cardObject that was clicked into the selectedCards array in deck
// how will it know which one was clicked?
// compare ids?
// then find index?
// then add that index to new array wihtout removing it from this.cards arr?

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

function toggleMiddleView(hidden, displayed) {
  // element.hidden = !element.hidden;
  hidden.classList.add('hide-it');
  displayed.classList.remove('hide-it');
}

function toggleAsideView(asides) {
  for (var i = 0; i < asides.length; i++) {
    // if (asides[i].classList.contains('hide-aside')) {
    //   asides[i]classList.remove('hide-aside');
    // }
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
  // am i going to want a global arr of instDecks so i can loop through it here
  // and access the matches property (count). even though i only have 1 deck now i
  // might have more later to get the randomization done

  // i shouldnt even have to loop though - i can just pull index 0

var playGameButton = document.getElementById('play-game-button-js');
var p1InputField = document.getElementById('player1');
var errorMsgP1 = document.getElementById('error-P1');
var formView = document.querySelector('.hide-able-form')
var directionsView = document.querySelector('.game-directions')
var p1NameSpan = document.querySelector('.p1-name');

playGameButton.addEventListener('click', clickPlayGameButton);


function clickPlayGameButton() {
  player1Name = p1InputField.value;
  if (p1InputField.value.length === 0) {
    errorMsgP1.innerText = 'Error! Please enter name.'
  } else {
    toggleView(formView);
    toggleView(directionsView);
    updateSpan(player1Name);
  }
  // make it so that it can't be blank spacing and still work
// does it meet the 32 character rule built into html?
}


function toggleView(element) {
  element.hidden = !element.hidden;
}

function updateSpan(name) {
  // make name uppercase
  p1NameSpan.innerText = `${name}`;

}

class Deck {
  constructor(id, cards) {
    this.id = id;
    this.cards = cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }
  shuffle() {
    var shuffledCards = this.cards.sort(() => Math.random() - 0.5);
// the sorting function uses random number that is positive or negative to
// randonmly reorder the elements in the array
    this.cards = shuffledCards;
    console.log(this.cards);
  }
  checkSelectedCards() {
    if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
      this.matches += 1;
      this.selectedCards[0].match();
      this.selectedCards[1].match();
      return true;
    }
  }
  moveToMatched() {
      for (var i = 0; this.selectedCards.length; i++) {
      this.matchedCards.push(this.selectedCards[i]);
      this.selectedCards.shift();
      }
  }
}

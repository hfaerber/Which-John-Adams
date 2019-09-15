class Deck {
  constructor(id, cards) {
    this.id = id;
    this.cards = cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }
  shuffle() {

  }
  checkSelectedCards() {
    if (this.selectedCards[0].matchId === this.selectedCards[1].matchId) {
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

class Card {
  constructor(matchInfo) {
    this.matchInfo = matchInfo;
    this.matched = false;

  }
 match() {
   this.matched = != this.matched;
 }

}

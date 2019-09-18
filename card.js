class Card {
  constructor(id, matchInfo) {
    this.id = id;
    this.matchInfo = matchInfo;
    this.matched = false;
  }
  match() {
   this.matched = true;
 }
}

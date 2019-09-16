class Card {
  constructor(id, matchInfo) {
    this.id = id;
    this.matchInfo = matchInfo;
    this.matched = false;
    this.selected = false;
  }
 match() {
   this.matched = true;
 }

}

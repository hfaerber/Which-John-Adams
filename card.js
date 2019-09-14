class Card {
  constructor(id, matchInfo) {
    this.id = id;
    this.matchInfo = matchInfo;
    // this.img =
    this.matched = false;

  }
 match() {
   this.matched = !this.matched;
 }

}

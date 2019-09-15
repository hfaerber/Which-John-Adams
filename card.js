class Card {
  constructor(id, matchId) {
    this.id = id;
    this.matchId = matchId;
    this.matched = false;
    this.selected = false;
  }
 match() {
   this.matched = true;
 }

}

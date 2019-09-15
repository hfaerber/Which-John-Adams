class Card {
  constructor(id, matchId) {
    this.id = id;
    this.matchId = matchId;
    this.matched = false;

  }
 match() {
   this.matched = true;
 }

}

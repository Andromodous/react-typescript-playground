import { Deck } from './Deck'
import { Player, User } from './Player'
import { Dealer } from './Dealer'

export class Game {
   Deck: Deck;
   Players: User[];

   constructor() {
      this.Deck = new Deck();
      this.Players = [];
      this.Players.push(new Player("Kyle"));
      this.Players.push(new Dealer());

      //draw 2 cards each
      for (let i = 0; i < 2; i++) {
         for (const player of this.Players) {
            player.addCard(this.Deck)
         }
      }
   }

   play() {
      for (const player of this.Players) {
         player.haveTurn(this.Deck, 'hit');
      }
      this.decide();
   }

   decide(): boolean {
      let beat: boolean = false;
      for (let i = 0; i < this.Players.length - 1; i++) {
         beat = this.Players[i].bust() && this.Players[i].current() > this.Players[i + 1].current();
      }
      return beat;
   }
}
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
   }

   use() {
      this.round();
      this.round();
      let winner: User | null = null;
      for (const player of this.Players) {
         if (player.hand.blackJack()) {
            winner = player;
         }
      }
      if(winner) return winner;
      return this.play();
   }

   round() {
      for (const player of this.Players) {
         player.addCard(this.Deck);
      }
   }

   play() {
      for (const player of this.Players) {
         player.haveTurn(this.Deck);
      }
      return this.decide();
   }

   decide(): User | void {
      // let winner = null;
      // for (const player of this.Players) {
      //    winner = player;
      // }
      // return ;
   }
}
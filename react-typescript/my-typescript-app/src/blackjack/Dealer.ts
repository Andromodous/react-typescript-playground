import { Hand } from './Hand'
import { Player, User } from './Player'
import { Deck } from './Deck'

export class Dealer implements User {
    name: String;
    hand: Hand;
    Deck: Deck;
    Players: User[];

    constructor() {
        this.name = 'Dealer';
        this.hand = new Hand([]);
        this.Deck = new Deck();
        this.Players = [new Player("Kyle"), this];
    }

    use() : User | null {
        this.round();
        this.round();
        let winner: User | null = null;
        for (const player of this.Players) {
           if (player.hand.blackJack()) {
              winner = player;
           }
        }
        if(winner) return winner;
        winner = this.play();
        return winner;
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

    addCard(deck: Deck) {
        this.hand.add(deck.select());
    }

    bust(): boolean {
        return this.hand.bust();
    }

    current(): number {
        return this.hand.current();
    }

    beat() : boolean {
        return this.hand.beat(this.hand);
    }

    haveTurn(deck: Deck) {
        while (this.current() <= 17) {
            this.addCard(deck);
        }
    }

    decide(): User | null {
        let winner : User | null = null;
        for (const player of this.Players) {
            winner = !player.bust() && player.beat(this.hand) ? player : null;
            if(winner) break;
        }
        return winner;
     }
}
import { Hand } from './Hand'
import { User } from './Player'
import { Deck } from './Deck'

export class Dealer implements User {
    name: String = 'Dealer';
    hand: Hand;

    constructor() {
        this.hand = new Hand([]);
    }

    addCard(deck: Deck) {
        if (this.hand.current() < 17) {
            this.hand.add(deck.select());
        }
    }

    bust(): boolean {
        return this.hand.bust();
    }

    current() : number {
        return this.hand.current();
    }

    haveTurn(deck : Deck) {
        this.addCard(deck);
    }
}
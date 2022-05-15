import { Deck } from './Deck'
import { Hand } from './Hand'

export interface User {
    name: String;
    hand: Hand;
    haveTurn(deck: Deck, play?: String): void;
    addCard(deck: Deck): void;
    bust(): boolean;
    current(): number;
}

export class Player implements User {
    name: String;
    hand: Hand;

    constructor(name: String) {
        this.name = name;
        this.hand = new Hand([]);
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

    haveTurn(deck: Deck, play: String): void {
        switch (play) {
            case 'hit':
                this.addCard(deck);
                break;
            default:
                break;
        }
    }

}
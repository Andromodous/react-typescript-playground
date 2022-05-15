import { Card } from './Card'

export class Hand {
    hand: Card[];

    constructor(Hand: Card[]) {
        this.hand = Hand;
    }

    current(): number { //function
        let total: number = 0;
        for (const card of this.hand) {
            switch (card.value) {
                case 1:
                    21 - 11 >= total ? total += 11 : total += 1;
                    break;
                case 11: case 12: case 13:
                    total += 10;
                    break;
                default:
                    total += card.value;
                    break;
            }
        }
        return total;
    }

    bust(): boolean { //function
        const total : number = this.current();
        const bust : boolean = total > 21 ? true : false;
        return bust;
    }

    toString() {
        return this.hand;
    }

    add(card: Card) {
        this.hand = [...this.hand, card];
    }
}
import { Card } from './Card'

export class Hand {
    hand: Card[];

    constructor(Hand: Card[]) {
        this.hand = Hand;
    }

    current(): number {  
        let total: number = 0;
        let aceExists = false;
        for (const card of this.hand) {
            switch (card.value) {
                case 1:
                    10 >= total ? total += 11 : total += 1;
                    aceExists = true;
                    break;
                case 11: case 12: case 13:
                    total += 10;
                    break;
                default:
                    total += card.value;
                    break;
            }
        }
        if (aceExists && total > 21) total -= 10;
        return total;
    }

    bust(): boolean {  
        return this.current() > 21;
    }

    toString() {
        return this.hand;
    }

    add(card: Card) {
        this.hand = [...this.hand, card];
    }

    private has(value: number): boolean {
        for (const card of this.hand) {
            if (card.cardValue() === value) {
                return true;
            }
        }
        return false;
    }

    blackJack(): boolean {
        return this.has(1) && this.has(10);
    }

    beat(hand: Hand): boolean {
        return this.current() > hand.current();
    }
}
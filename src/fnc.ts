// 剩余参数
function buildName(firstName: string, ...resOfName: string[]) {
    return firstName + "  " + resOfName.join(" ")
}

interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

// 为了避免this被提示为any，在ts允许添加一个显示的this参数，this参数是一个假的参数，
// this出现在参数列表的最前面
// 编译的时候
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {
                suit: this.suits[pickedSuit], 
                card: pickedCard % 13
            };
        }
    }
}

// 回调函数中的this参数
// 回调函数被调用时，它会被当成一个普通函数调用，this将为undefined，这样就可以避免错误
interface MyEvent {
    message: string;
}

interface UIElement {
    addClickListener(onclick: (this: void, e: MyEvent) => {}): void;
}

class Handler {
    info: string;
    onClickBad(this: Handler, e: MyEvent) {
        this.info = e.message
    }
}

let h = new Handler()
let uiElement: UIElement;
// uiElement.addClickListener(h.onClickBad)

// 函数重载的检查
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number;}[]): number;
function pickCard(x: number): {suit: string;card: number;}
function pickCard(x): any {

}

pickCard(123)
pickCard([{suit: "xx", card: 2}])


interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {x: 1, y: 2}

// ts的 ReadonlyArray类型，将所有的可变方法都去掉
let ro: ReadonlyArray<number> = [1,2,3,4]

// 字符串索引签名，意味着可以由任意数量的属性
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

let s: SquareConfig = {color: "xx", a: "test", b: 1}

// 可索引的类型，描述了对象索引的类型，可以将索引签名设置为只读，这样就防止了给索引赋值
interface StringArray {
    readonly [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


// 函数类型
interface SearchFnc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFnc
mySearch = (source: string, subString: string): boolean => {
    return true
}

// 类实现接口，接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员，也就是都要public的
// private和public的属性名是不能一样的
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

let clock: ClockInterface = {
    currentTime: new Date(),
    setTime(d: Date) {

    }
}

class Clock implements ClockInterface {
    public currentTime: Date = new Date();
    public setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(now: Date) {
        this.currentTime = now;
    }
}

// 混合类型，一个对象可以的
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number): string { return '' };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


// 接口继承类
/**
 *  当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 
 *  就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 
 *  接口同样会继承到类的private和protected成员。 
 *  这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现
 *  有个啥卵用
 */
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { 
    }
}

class TextBox extends Control {
    select() {
    }
}

// class Image implements SelectableControl {
//     select() {}
// }

// interface的new函数？
interface ClassTest {
    new(): ClassTest
}

let classTest: ClassTest
// 开启了null的检查
// new classTest()

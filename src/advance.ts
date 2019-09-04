// 高级类型

// 交叉类型（Intersection Types）
/**
 * 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
 */
function extend<T extends object, K extends object> (o1: T, o2: K): T & K {
    const result: Partial<T & K> = {}
    for (const prop in o1) {
        if (o1.hasOwnProperty(prop)) {
            (<T>result)[prop] = o1[prop]
        }
    }
    for (const prop in o2) {
        if (o2.hasOwnProperty(prop)) {
            (<K>result)[prop] = o2[prop]
        }
    }
    return <T & K>result
}

extend({a: 1}, {b: 2})

// 联合类型（Union Types）
// 联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入number或string类型的参数

function padLeft(value: string, padding: string | number) {
    // ...
}

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    let b: Bird = {
        fly() {},
        layEggs() {}
    }
    return b
}

let pet = getSmallPet()
pet.layEggs()

// 类型守卫与类型区分（Type Guards and Differentiating Types）
if ((<Fish>pet).swim) {
} else {
    (<Bird>pet).fly()
}

// 用户自定义的类型守卫
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined
}
// 每当使用一些变量调用isFish时，
// TypeScript会将变量缩减为那个具体的类型，
// 只要这个类型与变量的原始类型是兼容的。
if (isFish(pet)) {
    pet.swim()
} else {
    pet.fly()
}


// typeof 类型守卫
function isNumber(x: any): x is number {
    return typeof x === "number";
}

function isString(x: any): x is string {
    return typeof x === "string";
}

function padLeft1(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// 因为TypeScript可以将它识别为一个类型守卫。 也就是说我们可以直接在代码里检查类型了。
// 因此不用跟上述一样那么麻烦的去写
function padLeft2(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}


// instanceof 类型守卫
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

let padder: Padder = getRandomPadder()

if (padder instanceof StringPadder) {
    padder.getPaddingString
}

if (padder instanceof StringPadder) {

}

// null 或者 undefined
/**
 *  类型检查器认为null与undefined可以赋值给任何类型。 
 *  null与undefined是所有其它类型的一个有效值。 
 *  这也意味着，你阻止不了将它们赋值给其它类型，
 *  就算是你想要阻止这种情况也不行。 
 *  --strictNullChecks 可以解决此错误，当声明一个变量时，它不会自动
 *  包含null或者undefined
 */
let var1 = null;

// 可选参数会被自动地加上undefined
function f(x: number, y?: number) {
    return x + (y || 0)
}
f(1, undefined)
// f(1, null)

/**
 *  如果编译器不能够去除null或undefined，
 *  你可以使用类型断言手动去除。 
 *  语法是添加!后缀：identifier!从identifier的类型里去除了null和undefined：
 */
/**
 *  本例使用了嵌套函数，
 *  因为编译器无法去除嵌套函数的null（除非是立即调用的函数表达式）。 
 *  因为它无法跟踪所有对嵌套函数的调用，
 *  尤其是你将内层函数做为外层函数的返回值。 
 *  如果无法知道函数在哪里被调用，
 *  就无法知道调用时name的类型。
 */
function fixed(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + ". the " + epithet
    }
    name = name || "bob"
    return postfix("great")
}

// 类型别名
// 类型别名会给一个类型起个新名字。 
// 类型别名有时和接口很像，
// 但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n
    } else {
        return n()
    }
}

// 可以在泛型中使用，还可以在属性里引用自己
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

// 与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。
type LinkedList<T> = T & { next?: LinkedList<T> }

interface Person {
    name: string;
}

let people: LinkedList<Person> = {
    name: "test"
}
let n1 = people.name
if (people.next) {

}

/**
 *  接口和类型别名的区别
 *  1. 接口创建了一个新的名字，可以在任何地方使用
 *  2. 类型别名在某些地方是不能使用的，例如错误信息
 *  3. 在编译器中将鼠标悬停在interfaced上，显示它返回的是Interface，
 *  4. 但悬停在aliased上时，显示的却是对象字面量类型。
 */

 // 字符串字面量的类型 + 联合类型，可以实现类似于枚举类型的字符串
 // 从实际效果来说，enum具有更好的提示

 type Easing = "ease-in" | "ease-out" | "ease-in-out"

 function animate(easing: Easing) {

 }
 animate("ease-in")
//  animate("xxx")

// 单例类型： 多数是指枚举成员类型和数字/字符串字面量类型
// 可辨识联合（Discriminated Unions）
/**
 *  可以合并单例类型，联合类型，类型守卫和类型别名来创建一个叫做可辨识联合的高级模式，它也称做标签联合或代数数据类型。 可辨识联合在函数式编程里很有用处。 一些语言会自动地为你辨识联合；而TypeScript则基于已有的JavaScript模式。 它具有3个要素：
 *  1. 具有普通的单例类型属性—可辨识的特征。
 *  2. 一个类型别名包含了那些类型的联合—联合。
 *  3. 此属性上的类型守卫。
 */
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

interface Triangle {
    kind: "triangle";
    width: number;
    height: number;
}

// 每个接口都有kind属性但有不同的字符串字面量类型。 kind属性称做可辨识的特征或标签。 
// type Shape = Square | Rectangle | Circle
type Shape = Square | Rectangle | Circle | Triangle

// 完整性检查
// 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。有两种方法
// 1. 首先是启用 --strickNullChecks ，并且指定返回一个返回类型， 这种方法存在微妙之处，且对旧代码支持不好

function area(s: Shape): number {
    switch(s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius ** 2
        case "triangle":
            return s.height * s.width;
    }
}

// 2: 使用never类型，编辑器用它来进行完整性检查
function assertNever(x: never): never {
    throw new Error("unexpected object: " + x)
}
function area1(s: Shape) {
    switch(s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius ** 2
        default:
            // return assertNever(s); // 会给出提示
    }
}

// 多态的this类型
/**
 *  多态的this类型表示的是某个包含类或接口的子类型。 
 *  这被称做F-bounded多态性。 它能很容易的表现连贯接口间的继承
 *  this
 */
class BasicCalculator {
    public constructor(protected value: number = 0) {
    }
    public add(operand: number): this {
        this.value += operand
        return this
    }
    public mutilply(operand: number): this {
        this.value *= operand
        return this
    }
}

let v = new BasicCalculator().add(1).mutilply(2)

class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin(): this {
        this.value = Math.sin(this.value)
        return this
    }
}

// 使用this类型，multiply会返回this，在这里就是ScientificCalculator
v = new ScientificCalculator(1).add(1).sin().mutilply(2)

// 索引类型（index types)
/**
 * 使用索引类型，编译器就能够检查使用了动态属性名的代码。 
 * 例如，一个常见的JavaScript模式是从对象中选取属性的子集。
 */
// function pluck(o, names) {
//     return names.map(n => o[n])
// }
// 注意一下这种写法： T[K][] 
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}

let r1: Rectangle = {
    width: 100,
    height: 100,
    kind: "rectangle"
}

let nr1: number[] = pluck(r1, ["width", "height"])

/**
 *  keyof T，索引类型查询操作符
 *  keyof Rectangle, 是完全可以和 'width' | 'height' | 'kind' 互相替换的
 *  但是，当添加新的属性到Rectangle时，这个keyof Rectangle会自动跟着变化
 * 
 *  T[K] 索引访问操作符
 *  只要确保类型变量K extends keyof T，就可以在普通上下文里面是有T[K]
 */
function getPropertyValue<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}

getPropertyValue(r1, "width")

// getPropertyValue(r1, "test")

interface Dictionary<T> {
    [key: string]: T;
}
let keys: keyof Dictionary<number>; // string
let value: Dictionary<number>['foo']; // number

// 映射类型
/**
 *  Typescript提供了从旧类型中创建新类型的一种方式 - 映射类型。
 *  在映射类型里，新类型以相同的形式去转换旧类型里面的每个属性
 */
type ReadOnly<T> = {
    readonly [P in keyof T]: T;
}
type Partial1<T> = {
    [P in keyof T]?: T[P]
} & { newMember: boolean } 

type Nullable<T> = { [P in keyof T]: T[P] | null }

type ReadOnlyPerson = ReadOnly<Person>
type PartialPerson = Partial1<Person>

// 非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。
type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
let prop1: ThreeStringProps;

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}

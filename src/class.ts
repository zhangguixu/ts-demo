
// 类:继承
class Animal {
    private name: string;
    constructor(theName: string) { 
        this.name = theName; 
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

// readonly修饰符
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number;
    constructor(name: string) {
        this.name = name
    }
}

let dad = new Octopus("man")

// 存取器，只支持es5以上的
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

// 静态属性

// 抽象类
/**
 *  抽象类做为其它派生类的基类使用。 
 *  它们一般不会直接被实例化。 
 *  不同于接口，抽象类可以包含成员的实现细节。
 *  abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
 */
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

// 无法进行实例化
// let d = new Department()

class AccountingDepartment extends Department {
    printMeeting(): void {

    }
}

let d: Department

d = new AccountingDepartment("accounting")

// 类当做接口使用
class Point2d {
    x: number;
    y: number;
}

interface Point3d extends Point2d {
    z: number;
}

let point3d: Point3d = {
    x: 1,
    y: 2,
    z: 3
}
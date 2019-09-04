let x: [string, number]

x = ["hello", 1]

function test(): void {
    console.log("this is my");
}

function error(message: string): never {
    throw new Error(message)
}

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length
strLength = (someValue as string).length

// 对象的展开，展开对象后面的属性会覆盖前面的属性
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };

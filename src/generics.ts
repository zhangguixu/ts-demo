// 泛型：用于创建可以重用，并且支持多中数据类型的组件

// 定义泛型函数
function identity<T>(arg: T): T {
    return arg
}

// 使用泛型函数
// 1. 显示指定类型
identity<string>("test")
// 2. 使用类型推论
identity("test")

let myIdentity: {<T>(arg: T): T} = identity;


// 泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T;
}
let myIdentity2: GenericIdentityFn = identity;


// 将参数放在接口
interface GenericIdentityFn1<T> {
    (arg: T): T;
}

let myIdentity3: GenericIdentityFn1<number> = identity;

myIdentity3(1)


// 泛型类
/**
 *  类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
 */
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();

myGenericNumber.add(1, 2)

// 注意：无法创建泛型枚举和泛型命名空间。

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIndentity<T extends Lengthwise> (args: T): T {
    console.log(args.length)
    return args
}

// loggingIndentity(3) 不再适合于任意类型
loggingIndentity({length: 1})

// 在泛型约束中使用类型参数
// keyof: 索引类型查询操作符，对于任何类型T，keyof T的结果为T上已知的公共属性名的联合
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

let property1 = {a: 1, b: 2}

getProperty(property1, "a")
getProperty(property1, "b")


// 在泛型中使用类类型
// 创建工厂函数
function create<T>(c: {new(): T;}): T {
    return new c()
}

let h1 = create(Handler)
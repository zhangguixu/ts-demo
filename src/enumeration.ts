enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}

// 反向映射
let fa = FileAccess.None
let nameOfFa = FileAccess["fa"]

// const枚举
/**
 *  大多数情况下，枚举是十分有效的方案。 
 *  然而在某些情况下需求很严格。 
 *  为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，
 *  我们可以使用const枚举。 常量枚举通过在枚举上使用const修饰符来定义。
 * 
 *  唯一的好处就是避免生成多余的代码
 *  常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除
 */
const enum Enum {
    A = 1,
    B = A * 2
}

let enum1 = [Enum.A, Enum.B]



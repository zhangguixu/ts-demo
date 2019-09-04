// TypeScript提供一些工具类型来帮助常见的类型转换。这些类型是全局可见的。

/**
 *  Partial<T>
 *  构造类型T，并将它所有的属性设置为可选的。
 *  它的返回类型表示输入类型的所有子类型。
 */
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fields: Partial<Todo>) {
    return {...todo, ...fields}
}

/**
 *  Readonly<T>
 *  
 */
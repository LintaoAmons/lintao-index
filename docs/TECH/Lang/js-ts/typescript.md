# Typescript

## Playground 快速实验

### Run Single Ts file

1. ts编译js后运行
```sh
tsc filepath.ts && node filepath.js
```

2. ts-node 直接运行
```sh
ts-node filepath.ts
```

## Data Types

### 检查 type 类型

### 涉及到 null/undefined 值的写法

#### nullish coalescing operator
```ts
var current = stack.pop() || null // 不正确

var current = stack.pop() ?? null; // 正确

console.log(0 || null) // output: null
console.log(0 ?? null) // output: 0
```

The nullish coalescing operator only returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, not when it's falsy like `0`, `''`, or `false`.

#### 值不为空才执行右边的命令

1. 结合 `!=` 与 `&&`

    ```js
    // 只有 `null` 和 `undefined` 才等于被判为 false

    console.log(3 != null); // true
    console.log(0 != null); // true
    console.log(false != null); // true
    console.log(null != null); // false
    console.log(undefined != null); // false
    ```

    ```js
    node = {val: 3}
    node?.val != null && console.log(node.val);

    node = {val: 0}
    node?.val != null && console.log(node.val);

    node = {}
    node?.val != null && console.log(node.val);
    ```

2. nullish coalescing operator

    在符号左边为 `null` 或者 `undefined` 的时候，返回右边的值

    ```js
    (node?.val ?? false) && console.log(1);
    ```

3. 错误写法
    ```ts
    // 当值为 0 的时候，虽然不为空,但仍然被视为 false，不会执行右边的命令
    current.left && stack.push(current.left);
    0 && console.log(1) // 虽然左边不为null/undefined, 但是右边仍然不会被执行, 1 不会被打印出来
    ```

### Data type convert 数值类型转换

#### string --> number
> https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/

```sh
> var quantity = '12'
> console.log(Number(quantity))
12
> console.log(parseInt(quantity))
12
> console.log(+quantity)
12
> console.log(parseFloat('13.4'))
13.4
```

```ts
@Put(':id')
update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
	return this.accountService.update(+id, updateAccountDto); // +convert string into number
}
```

## Datetime

## Containers

### Array

#### 定义与赋值

1. 使用数组字面量定义和初始化数组：
    ```typescript
    let numbers: number[] = [1, 2, 3, 4, 5];
    ```

2. 使用Array构造函数定义和初始化数组：
    ```typescript
    let fruits: Array<string> = new Array("Apple", "Banana", "Orange");
    ```

3. 定义空数组并后续赋值：
    ```typescript
    let names: string[] = [];
    names = ["Alice", "Bob", "Charlie"];
    ```

4. 直接赋值给数组元素：
    ```typescript
    let colors: string[] = [];
    colors[0] = "Red";
    colors[1] = "Green";
    colors[2] = "Blue";
    ```

#### 数组解构

1. 基本数组解构：
    ```typescript
    let numbers: number[] = [1, 2]
    let [first, second] = numbers;
    console.log(first);  // 输出: 1
    console.log(second); // 输出: 2
    ```

2. 忽略某些元素：
    ```typescript
    let numbers: number[] = [1, 2, 3]
    let [one, , three] = numbers;
    console.log(one);   // 输出: 1
    console.log(three); // 输出: 3
    ```

3. 剩余元素收集：
    ```typescript
    let numbers: number[] = [1, 2, 3, 4, 5]
    let [head, ...tail] = numbers;
    console.log(head); // 输出: 1
    console.log(tail); // 输出: [2, 3, 4, 5]
    ```

4. 默认值：
    ```typescript
    let [x = 0, y = 0] = [1];
    console.log(x); // 输出: 1
    console.log(y); // 输出: 0
    ```

#### Slice an array

#### Object values to array

```ts
var a = { abc: ['abc', 'cba'], bcs: ['cbs'], cc: { dd: 5 } }

console.log(Object.values(a)) // [ [ 'abc', 'cba' ], [ 'cbs' ], { dd: 5 } ]
```

#### 判断元素在不在Array中

1. **使用`includes()`方法**：
   `includes()`方法用来判断数组是否包含某个指定的值，如果是返回`true`，否则返回`false`。

   ```javascript
   let array = [1, 2, 3, 4, 5];
   console.log(array.includes(3)); // 返回 true
   ```

2. **使用`indexOf()`方法**：
   `indexOf()`方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

   ```javascript
   let array = [1, 2, 3, 4, 5];
   let index = array.indexOf(3); // 返回 2
   console.log(index !== -1); // 返回 true
   ```

3. **使用`find()`方法**：
   `find()`方法返回数组中满足提供的测试函数的第一个元素的值。如果没有找到符合条件的元素，则返回`undefined`。

   ```javascript
   let array = [1, 2, 3, 4, 5];
   let element = array.find(element => element === 3); // 返回 3
   console.log(element !== undefined); // 返回 true
   ```

4. **使用`some()`方法**：
   `some()`方法测试数组中是不是至少有一个元素通过了被提供的函数测试。它返回的是一个布尔值。

   ```javascript
   let array = [1, 2, 3, 4, 5];
   console.log(array.some(element => element === 3)); // 返回 true
   ```

5. **使用`filter()`方法**：
   `filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。如果元素不存在，返回的数组为空。

   ```javascript
   let array = [1, 2, 3, 4, 5];
   let filteredArray = array.filter(element => element === 3); // 返回 [3]
   console.log(filteredArray.length > 0); // 返回 true
   ```

6. **使用`for`循环**：
   使用传统的`for`循环遍历数组，并检查元素是否存在。

   ```javascript
   let array = [1, 2, 3, 4, 5];
   console.log)(false;
   for(let i = 0; i < array.length; i++) {
       if(array[i] === 3) {
           isPresent = true;
           break;
       }
   }
   // 返回 true
   ```

7. 注意不能用 `in` 来判断

    `in` 是判断有没有这个 index
    ```ts
    const numbers = [1, 3, 3, 4, 5];
    // 即使 2 不在元素里面，也会执行右边的 log
    2 in numbers && console.log("Index 2 exists in the numbers array."); // Index 2 exists in the numbers array.
    6 in numbers && console.log("Index 6 exists in the numbers array."); // false
    ```

### Map
#### 用 Object 做 map/dict
> 感觉这个操作有点怪哈

```sh
# init
> const map1: { [key: string]: number } = {a: 1, b:2}

# CRUD
> map1.c = 3
3
> console.log(map1.c)
3
> map1.a = 4
4
> console.log(map1)
{ a: 4, b: 2, c: 3 }
> delete map1.c
true
> console.log(map1)
{ a: 4, b: 2 }

# 常见操作
> Object.values(map1)
[ 4, 2 ]
> Object.keys(map1)
[ 'a', 'b' ]
> Object.entries(map1)
[ [ 'a', 4 ], [ 'b', 2 ] ]
```

## 面向对象

### Class Definition

TypeScript 中定义类的基本语法如下：

```typescript
class ClassName {
    // 类的属性
    property1: type;
    property2: type;

    // 构造函数
    constructor(parameter1: type, parameter2: type) {
        this.property1 = parameter1;
        this.property2 = parameter2;
    }

    // 类的方法
    method1(): returnType {
        // 方法实现
    }

    method2(parameter: type): void {
        // 方法实现
    }

    // 静态方法
    static staticMethod(staticParameter: type): void {
        // 静态方法实现
    }
}

// 创建类的实例
const objectName = new ClassName(value1, value2);

// 调用类的方法
objectName.method1();
objectName.method2(argument);

// 调用静态方法
ClassName.staticMethod(staticArgument);
```

在这个基本语法中：

- `class ClassName { ... }` 定义了一个类。
- 类中可以包含属性和方法。
- 构造函数 `constructor` 用来初始化类的实例，并设置初始属性值。
- 方法可以有返回类型，也可以是 `void`。
- 使用 `new` 关键字来实例化类。
- 可以通过实例对象来访问类的属性和方法。


## 常用对象

### URL

```js
const url = new URL("https://username:password@subdomain.example.com:8080/path/to/resource?param1=value1&param2=value2#section1");

console.log(url)

// output
URL {
  href: 'https://username:password@subdomain.example.com:8080/path/to/resource?param1=value1&param2=value2#section1',
  origin: 'https://subdomain.example.com:8080',
  protocol: 'https:',
  username: 'username',
  password: 'password',
  host: 'subdomain.example.com:8080',
  hostname: 'subdomain.example.com',
  port: '8080',
  pathname: '/path/to/resource',
  search: '?param1=value1&param2=value2',
  searchParams: URLSearchParams { 'param1' => 'value1', 'param2' => 'value2' },
  hash: '#section1'
}
```

## Api Call

### Fetch

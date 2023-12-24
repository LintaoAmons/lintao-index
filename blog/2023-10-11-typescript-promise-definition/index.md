---
tags: [ts]
---

# Typescript Promise Definition

You can find the `lib.es2015.promise.d.ts` source code at the end of this blog

## `.d.ts` 文件

`.d.ts` 文件在 TypeScript 中被称为声明文件。这些文件的主要目的是为了提供 TypeScript 编译器关于 JavaScript 库的类型信息。JavaScript 是一种动态类型语言，因此它的库和框架通常不包含类型信息。为了在 TypeScript 中使用这些库和框架，开发者需要提供类型信息，这就是 `.d.ts` 文件的作用。

在 `.d.ts` 文件中，你可以声明变量、函数、类等的类型，以便 TypeScript 编译器能理解这些 JavaScript 代码的类型信息。

举个例子，比如你在项目中使用了 jQuery 这个 JavaScript 库，但是 TypeScript 编译器并不知道 `$` 或 `jQuery` 这些对象的类型。在这种情况下，你需要一个 `jquery.d.ts` 文件，其中包含了所有 jQuery 对象和函数的类型声明，这样 TypeScript 编译器就能理解这些对象和函数了。

在大多数情况下，你不需要自己写 `.d.ts` 文件。许多流行的 JavaScript 库和框架的类型声明文件都可以在 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 项目中找到。你可以通过 npm 安装这些类型声明文件到你的项目中。


## 三斜线指令（Triple-Slash Directives）

`///` 是 TypeScript 中的一个特殊注释语法，称为三斜线指令（Triple-Slash Directives）。这种指令为编译器提供了某些指示或信息。

Triple-Slash Directives 是包含单个 XML 标签的单行注释。注释的内容会影响编译器的行为。比如：

- `/// <reference path="..." />` 用来告诉编译器在编译当前文件时，还需要包含指定路径下的另一个文件。
- `/// <reference types="..." />` 用来声明当前文件需要依赖的类型定义模块。
- `/// <reference lib="..." />` 用来引入额外的内置库文件（比如 "dom", "es2015" 等）。
- `/// <reference no-default-lib="true"/>` 用来告诉编译器不要包含默认的库文件。

这些指令提供了一种在源文件中包含附加的编译信息的方式。

### 在这里的作用

```ts
// highlight-next-line
/// <reference no-default-lib="true"/>

interface PromiseConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Promise<any>;
    ...
}
```

🤖:
这段代码看起来像是定义了一个 Promise 的 TypeScript 类型声明 (`d.ts`) 文件。在这种情况下， `/// <reference no-default-lib="true"/>` 可能被使用的原因如下：

通常，TypeScript 在编译时会自动引入一些默认的库文件，包括对一些基本的 JavaScript 特性（如 Promise、Array、Object 等）的声明。这个行为通常是有用的，因为它让 TypeScript 能够理解并检查这些基本特性的使用。

然而，在这个特定的文件中，作者似乎想要自定义 Promise 的类型声明，可能是因为他们需要一些非标准的行为，或者他们正在创建一个特定的环境，这个环境需要特殊的 Promise 实现。

在这个情况下， `/// <reference no-default-lib="true"/>` 指令被添加到文件的开头，用来告诉 TypeScript 编译器在处理这个文件时，不要自动引入默认的库文件。这样，作者就可以自由地自定义 Promise 的类型声明，而不用担心和默认的声明冲突。

## declare

这是 TypeScript 代码，`declare var Promise: PromiseConstructor;` 这一句的意思是声明一个全局的变量 `Promise`，它的类型是 `PromiseConstructor`。

在 TypeScript 中，`declare var` 用于声明全局变量。`Promise` 是 JavaScript 的一个内置对象，用于处理异步操作。在这里，这句代码是在告诉 TypeScript，全局有一个名为 Promise 的变量，并且它的类型是 `PromiseConstructor`。

`PromiseConstructor` 是一个接口，定义了 Promise 对象的构造函数和一些静态方法，例如 `all`, `race`, `reject` 和 `resolve`。

当你在代码中使用 `Promise` 对象时，TypeScript 就会根据这个声明来检查你的代码是否正确使用了 `Promise` 和它的方法。

==到这里就可以理解到： 在ts中使用 Promise 类型时，他类型信息就在这个文件声明定义了==

## prototype TODO

```ts
interface PromiseConstructor {
    /**
    * A reference to the prototype.
    */
    // highlight-next-line
    readonly prototype: Promise<any>; 这个咋理解
    ...
}

```

## all 方法

```ts
/**
* 创建一个Promise，当提供的所有Promise都解析时，该Promise会用结果数组进行解析，如果有任何Promise被拒绝，那么它会被拒绝。
* @param values 一个Promise数组。
* @returns 一个新的Promise。
*/
all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
```

🤖:
这是 TypeScript 中的一个泛型方法声明，我们逐部分来看：

1. `all<T extends readonly unknown[] | []>`: 这是声明一个泛型方法 `all`，`T` 是泛型参数。`T extends readonly unknown[] | []` 指定了 `T` 可以是任何只读数组，或者空数组。`unknown` 是 TypeScript 的一个类型，表示未知类型。这里的 `unknown[]` 表示元素类型未知的数组。

2. `(values: T)`: 这是方法的参数列表。方法接收一个名为 `values` 的参数，其类型为 `T`。因为 `T` 已经被定义为只读数组或空数组，所以 `values` 必须是这些类型的实例。

3. `Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>`: 这是方法的返回类型。这个方法返回一个 `Promise` 对象，这个 `Promise` 对象解析后的结果是一个对象。这个对象的类型通过映射类型 `{ -readonly [P in keyof T]: Awaited<T[P]> }` 定义。

   - `{ -readonly [P in keyof T]: Awaited<T[P]> }` 是一个映射类型，它会遍历 `T`（即 `values` 参数的类型）的所有键（即数组的索引），并将每个键 `P` 映射为一个新的类型 `Awaited<T[P]>`。

   - `Awaited<T[P]>` 是一个条件类型，它等待 `T[P]` 的 Promise 解析。如果 `T[P]` 是一个 Promise，`Awaited<T[P]>` 就是这个 Promise 解析后的类型；如果 `T[P]` 不是一个 Promise，`Awaited<T[P]>` 就是 `T[P]`。

   - `-readonly` 用于移除映射类型的 `readonly` 修饰符，使得结果类型的属性不是只读的。

总的来说，这个方法接收一个只读数组（或空数组），数组中的元素可以是 Promise 或者非 Promise。这个方法返回一个 Promise，这个 Promise 解析后的结果是一个对象，这个对象的每个属性都对应输入数组的一个元素，属性的类型是相应元素的 Promise 解析后的类型（如果元素是 Promise 的话）。

### why there's a `-` before `readonly`

🤖:
In TypeScript, the `-` prefix before a modifier like `readonly` in a mapped type is used to remove that modifier.

In the context of this specific type `{ -readonly [P in keyof T]: Awaited<T[P]> }`, the `-readonly` is used to ensure that the resulting mapped type's properties are not `readonly`, even if they were `readonly` in the original type `T`.

This syntax is useful when you want to create a new type based on an existing type, but you want to change some modifiers of the original type. For instance, if you want to create a new type that is similar to an existing type but allows mutation of the properties, you can use `-readonly` to remove the `readonly` modifier from the properties.

Here's a simple example:

```typescript
type ReadonlyType = {
  readonly a: number;
  readonly b: number;
};

type MutableType = {
  -readonly [P in keyof ReadonlyType]: ReadonlyType[P];
};

// Now `MutableType` is equivalent to:
// type MutableType = {
//   a: number;
//   b: number;
// };
```

In `MutableType`, the `-readonly` removes the `readonly` modifier from the properties of `ReadonlyType`, creating a new type where `a` and `b` can be mutated.

### Example

🤖:
这个描述是JavaScript中 `Promise.all` 方法的用法，下面是一个例子：

```javascript
// 创建一个模拟异步操作的函数
function asyncOperation(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay > 2000) {
        reject('Delay is too long');
      } else {
        resolve(value);
      }
    }, delay);
  });
}

// 创建一个Promise数组
let promises = [asyncOperation('first', 1000), asyncOperation('second', 500), asyncOperation('third', 1500)];

// 使用Promise.all处理这个Promise数组
Promise.all(promises)
  .then(results => {
    // 当所有Promise都解析时，这个函数会被调用，并且results会是一个包含所有解析值的数组
    console.log(results); // 输出: ['first', 'second', 'third']
  })
  .catch(error => {
    // 如果有任何一个Promise被拒绝，这个函数会被调用
    console.log('Error: ' + error); // 输出: 'Error: Delay is too long'
  });
```

在这个例子中，`Promise.all` 接收一个Promise数组作为参数，返回一个新的Promise。当所有Promise都解决时，返回的Promise会解决，并且解决值是一个包含所有解决值的数组。如果有任何一个Promise被拒绝，返回的Promise就会被拒绝，拒绝理由是第一个被拒绝的Promise的拒绝理由。


## Await type

```ts
/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */
type Awaited<T> =
    T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
        T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
            F extends ((value: infer V, ...args: infer _) => any) ? // if the argument to `then` is callable, extracts the first argument
                Awaited<V> : // recursively unwrap the value
                never : // the argument to `then` was not callable
        T; // non-object or non-thenable
```

怎么读： 三元表达式，找问号和冒号

这是一个 TypeScript 中的高级类型（Advanced Type）定义，其名为 `Awaited`。这个类型是用来递归地解开一个类型的 "awaited type"。换句话说，它是用来获取到一个 Promise 所包裹的类型。

让我们一步步地理解这个定义：

1. `T extends null | undefined ? T :`：如果 T 是 null 或 undefined，直接返回 T。这是针对 TypeScript 非严格空值检查模式下的特殊情况。

2. `T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ?` ：这个判断是查看 T 是否是一个包含 `then` 方法的对象。如果 T 是一个对象，并且这个对象有一个 `then` 方法，那么就进入下一步的判断。如果不是，就直接返回 T。

3. `F extends ((value: infer V, ...args: infer _) => any) ?`：这个判断是查看 `then` 方法的第一个参数是否是一个函数。如果是，那么就提取出这个函数的第一个参数的类型（V），并进入下一步的判断。

4. `Awaited<V> :`：如果上一步的判断成立，那么就递归地对 V 使用 `Awaited` 类型，也就是尝试继续解开 V 的 "awaited type"。如果 V 不是一个 Promise，那么这个递归就会在第二步的 `T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ?` 那里结束，并返回 V。

5. `never :`：如果 `then` 方法的第一个参数不是一个函数，那么就返回 never。

综上，这个 `Awaited` 类型实际上是用来解开一个 Promise 类型，获取到 Promise 所包裹的类型。例如，如果有 `type X = Promise<string>`，那么 `Awaited<X>` 就会是 `string`。如果 `X` 是一个 `Promise<Promise<string>>`，那么 `Awaited<X>` 也会是 `string`，因为 `Awaited` 会递归地解开所有层级的 Promise。


## Source Code

<details>
<summary>lib.es2015.promise.d.ts source code</summary>

```ts
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


/// <reference no-default-lib="true"/>

interface PromiseConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used to resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

    // see: lib.es2015.iterable.d.ts
    // all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;

    // see: lib.es2015.iterable.d.ts
    // race<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T = never>(reason?: any): Promise<T>;

    /**
     * Creates a new resolved promise.
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    resolve<T>(value: T): Promise<Awaited<T>>;
    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
}

declare var Promise: PromiseConstructor;
```
</details>



---
tags: ["js"]
---

# JS Prototype

> REF:
> 
> - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
>
> - https://www.programiz.com/javascript/prototype

Every object in JavaScript has a built-in property, which is called its prototype. The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype.

   ┌────────┐    ┌──────────────┐
   │myObject│--->│ prototype    │             ┌───────────────┐
   └────────┘    │Also an Object│---> ... --->│prototype(null)│
                 └──────────────┘             └───────────────┘

## 其实任何一个函数都可以是构造函数是吧？主要是里面有没有this？

🤖:
是的，你是对的。在JavaScript中，任何函数都可以被当作构造函数。但是，如果你想要你的函数作为构造函数使用，那么你通常会在函数中使用`this`关键字来引用并设置新创建的对象的属性。

例如，以下函数可以作为构造函数：

```javascript
function MyConstructor() {
  this.property = "value";
}
```

你可以使用`new`关键字创建一个新的`MyConstructor`对象：

```javascript
let myObject = new MyConstructor();
console.log(myObject.property);  // 输出 "value"
```

然而，如果你不使用`this`关键字，那么你的“构造函数”就不会设置任何对象的属性，这可能并不是你想要的：

```javascript
function NotReallyAConstructor() {
  let property = "value";
}
```

在这个例子中，`property`变量是`NotReallyAConstructor`函数的一个局部变量，而不是新创建的对象的一个属性。因此，这个函数虽然可以被当作构造函数使用，但实际上它并没有做任何构造函数应该做的事情。

所以，虽然技术上来说任何函数都可以被当作构造函数，但实际上，一个有效的构造函数通常会使用`this`关键字来设置新对象的属性。


## 所以关键在于 new 干了什么事？
> REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

🤖:
在JavaScript中，`new`关键字是用来创建和初始化新对象的。当你使用`new`关键字调用一个函数（我们通常称这种函数为构造函数）时，JavaScript会执行以下步骤：

1. **创建一个新对象**：JavaScript首先会创建一个新的空对象。

2. **设置原型链**：新创建的对象的`__proto__`属性（也就是它的原型）会被设置为构造函数的`prototype`对象。这意味着新创建的对象可以访问在构造函数的`prototype`对象中定义的所有属性和方法。

3. **调用构造函数**：接着，JavaScript会使用**新创建的对象作为上下文**（也就是`this`的值）来调用构造函数。这意味着在构造函数内部，`this`关键字会引用新创建的对象。构造函数通常会使用`this`关键字来设置新对象的属性。

4. **返回新对象**：如果构造函数没有显式地返回一个对象，那么`new`表达式会自动返回新创建的对象。如果构造函数返回了一个对象，那么`new`表达式会返回这个对象。如果构造函数返回的是一个非对象类型的值，那么这个返回值会被忽略，`new`表达式还是会返回新创建的对象。

这就是`new`关键字在JavaScript中的作用。使用`new`关键字可以确保构造函数总是返回一个对象，而且这个对象可以访问在构造函数的`prototype`对象中定义的所有属性和方法。同时，`new`关键字还确保了在构造函数内部，`this`关键字总是引用新创建的对象。


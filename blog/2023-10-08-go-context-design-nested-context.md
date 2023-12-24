---
tags: ["go", "context"]
---

# Go Context Design Nested Context

🗨:
```go
func WithValue(parent Context, key, val any) Context {
	if parent == nil {
		panic("cannot create context from nil parent")
	}
	if key == nil {
		panic("nil key")
	}
	if !reflectlite.TypeOf(key).Comparable() {
		panic("key is not comparable")
	}
	return &valueCtx{parent, key, val}
}
```

为什么要用这种 delegate 的结构，而不是直接一个 map 储存多个 键值对

🤖:
这是一个很好的问题。这段代码来自Go的context包，它实现了一个可以传递键值对的context对象。context对象通常在请求作用域内用于传递数据和取消信号。

你提到的"delegate"结构，也就是这里的嵌套context，是Go语言context包的一种设计策略。在这个设计中，每个WithValue调用都会返回一个新的context，这个新的context包含了父context及新的键值对。这是一种链式的存储方式，而不是用一个单独的map去存储所有键值对。

选择这种设计的原因主要有两个：

1. **并发安全：** Go语言是并发友好的语言，这种设计保证了在并发情况下context的安全使用。如果使用单个map存储所有键值对，那么在并发情况下，需要额外的同步机制来保证map的安全访问。

2. **不可变性：** 这种设计使得context具有了不可变性。每次添加键值对都会返回新的context，而不是修改原来的context。这样可以避免在函数间传递context时，由于误操作修改了context的内容，导致数据的不一致。

你可能会问，这种设计不会导致效率降低吗？实际上，由于context的使用场景通常是在请求作用域内，键值对的数量相对较少，因此这种设计的效率影响并不大。同时，它带来的并发安全和不可变性的好处，更符合context的使用需求。

🗨:
对于不可变性，新产生的 valueCtx 中的 parent 是一个全新的ctx 实例吗，还是只是指向同一个 父 ctx instance?

🤖:
新产生的`valueCtx`中的`parent`不是一个全新的context实例，而是对父context的引用。这意味着它们都指向同一个父context实例。

这是Go语言context包实现不可变性的方式：每次`WithValue`被调用，都会创建一个新的`valueCtx`，这个新的`valueCtx`包含了对父context的引用和新的键值对。这样，新的`valueCtx`和父context共享了同一份数据，但是任何对新的`valueCtx`的修改都不会影响到父context，因为这些修改都是在新的`valueCtx`上进行的。

这种设计使得context具有了不可变性：你可以安全地在函数间传递context，而不用担心一个函数会不小心修改了另一个函数正在使用的context的数据。

要注意的是，虽然context的不可变性对于并发编程非常有用，但这并不意味着你可以安全地在多个goroutine中共享一个context实例。如果你的程序中存在这种情况，你仍然需要使用适当的同步机制来保证并发安全。

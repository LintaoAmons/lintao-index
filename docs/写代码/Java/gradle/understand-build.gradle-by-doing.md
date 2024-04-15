# 通过实现一个简单闭包来理解 `build.gradle`


在 `build.gradle` 里面你会看到这个代码，如果你不熟悉 groovy 可能会有点懵逼，不知道他是怎么定义和调用的

```groovy
plugins {
    id 'java'
}
```

下面我们通过一个简单的模拟实现，来理解这个代码

## 步骤 1: 基本的方法调用和闭包

首先，我们将创建一个简单的Groovy脚本，其中包含一个方法调用和一个闭包。


```groovy
def sayHello(closure) {
  closure()
}

sayHello {
    println "Hello, World!"
}
```

在这个示例中，我们定义了一个名为sayHello的方法，它接受一个闭包作为参数，并执行这个闭包。然后我们调用sayHello方法，并传递一个闭包作为参数。这个闭包只是打印"Hello, World!"。

### 省略括号的闭包调用

在Groovy中，如果一个方法的最后一个参数是闭包，你可以将闭包放到方法参数的外面，这就是所谓的闭包语法糖。

下面两个是等价的:

```groovy
sayHello { println 'Hello, World!' }
```

```groovy
sayHello({ println 'Hello, World!' })
```

## 步骤 2: 使用委托对象
接下来，我们将向sayHello方法添加一个委托对象，这个对象将提供闭包内部调用的方法。

```groovy
class Greeting {
    def say(String message) {
        println message
    }
}

def sayHello(closure) {
    def greeting = new Greeting()
    closure.delegate = greeting
    closure.resolveStrategy = Closure.DELEGATE_FIRST
    closure()
}

sayHello {
    say "Hello, World!"
}
```

在这个示例中，我们创建了一个名为Greeting的类，它有一个say方法，用于打印一条消息。在sayHello方法中，我们创建了Greeting的一个实例，并将它设置为闭包的委托对象。这意味着当我们在闭包内部调用say方法时，这个调用将被委托到Greeting实例上。

> NOTE: 所以其实可以这么理解，这里调用了一个 `sayHello` 的方法，方法里面有一个对象有 `say`，会被调用，其调用参数就是这个 `"Hello, World!"`。
> 至于这个有 say 方法的对象具体是什么实现，这里调用处就不用管了,只需要知道有这个能力就行了


## 步骤 3: 模拟插件配置
最后，我们将创建一个模拟插件配置的示例。

```groovy
class PluginConfig {
    def id(String pluginId) {
        println "Applying plugin: $pluginId"
    }
}

def plugins(closure) {
    def config = new PluginConfig()
    closure.delegate = config
    closure.resolveStrategy = Closure.DELEGATE_FIRST
    closure()
}

plugins {
    id 'java'
}
```

在这个示例中，我们创建了一个名为PluginConfig的类，它有一个id方法，用于打印应用插件的消息。plugins方法创建了PluginConfig的一个实例，并将它设置为闭包的委托对象。这样当我们在闭包内部调用id方法时，这个调用将被委托到PluginConfig实例上。

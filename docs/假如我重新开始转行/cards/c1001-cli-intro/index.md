## 目录

* [1. 引言](#1.-引言)
  * [1.1. 结构](#1.1.-结构)
* [2. 参数 arguments](#2.-参数-arguments)
* [3. 选项 Options](#3.-选项-options)
  * [3.1. 标志 Flags](#3.1.-标志-flags)
* [4. `--help` (或者直接ChatGPT)](#4.-`--help`标志-(或者直接chatgpt))
  * [4.1. `--help`的常见别名](#4.1.-`--help`标志的常见别名：)
  * [4.2. 详细程度的层次](#4.2.-详细程度的层次)
  * [4.3. `help`命令](#4.3.-`help`命令)
* [5. CLI描述语法约定](#5.-cli描述语法约定)

---
## 1. 引言
命令行界面（CLI: COMMAND LINE INTERFACE） 是一种通过命令行处理用户交互的应用程序。

所有信息以文本形式展示，用户通过输入命令来进行交互。

对于转行的同学来说，熟悉并且能够使用 CLI 的基本功能至关重要。

首先需要做到的第一点就是不要黑漆漆的终端吓到。

他完全体现了我们编程思想中的 `input -> process -> output`， 对之后的编程之路十分关键。

CLI在某些任务上（尤其是在熟悉命令的情况下处理重复性任务时）可能比图形用户界面（GUI）更快。

CLI相对于GUI的一个主要优势是它们更易于*自动化*

---
### 1.1. 结构
大多数CLI的设计结构如下：

- `<command> [options] arguments`
  - 示例：`mv -v move-me.txt testdir`

- `<command> <subcommand> [arguments] [options]`
  - 示例：`docker run -d -p 8080:80 nginx`

当然，这个只是大多数的设计，遵循这个规则，特别是现在新的 cli 工具，基本 follow 这个规则。比如 `k8s` 的 `kubectl`. 也会有例外，因为这个只是一个惯例，具体是什么样的规则，全看命令开发者的具体实现代码。


---
## 2. 参数 arguments

CLI中的参数允许用户向应用程序发送数据，有时在命令上下文中。

它们通常被称为位置参数，因为它们是通过位置来识别的，这意味着用户必须在正确的位置写入每个参数的值。

`mycli command argValue1 argValue2`

参数可以是必需的也可以是可选的。如果不是必需的，在缺少参数的情况下，通常会使用默认值。

例如：
- 没有提供参数 -> 安装package.json中的所有依赖
  - `> npm install`
- 参数值：some-package -> 仅安装some-package
  - `> npm install some-package`

另一个例子：
- 没有参数 -> 使用默认的远程和分支。
  - `> git fetch`
- 提供特定的远程和分支作为参数。
  - `> git fetch origin main`


---

## 3. 选项 Options

选项是可以传递给命令的命名参数，表示为键值对。

与位置参数不同，它们的位置并不重要。

- 键：`--message` 
- 值：`"commit message"`
  - `git commit --message "commit message"`

选项通常（不总是）用于表示可选参数。在大多数情况下，如果一个参数是必需的，位置参数是最佳选择。

一些选项具有别名，这些别名是相同选项的简短版本，更容易输入和记住。它们通常由单个破折号前缀标识：
- 长版本
  - `> mycli --help`
- 别名
  - `> mycli -h`

根据CLI和操作系统的不同，支持不同的分隔符。以下是一些最常见的：

- 单空格
  - `> mycli --file text.txt`
- `=`
  - `> mycli --file=text.txt`
- `:`
  - `> mycli --file:text.txt`


---

### 3.1. 标志 Flags

不需要值的选项通常称为标志。它们是布尔值，即它们的存在表示“真”，它们的缺失表示“假”。

使用标志的命令示例：
- `> git push --force`
- `> npm install --save-dev`


---

## 4. `--help` (或者直接ChatGPT)

当我们在命令后面加上help标志时，我们要求CLI为我们提供更多关于它的信息。通常，这些信息将包括命令的简短描述、参数、选项和别名。

示例：
- `> npm install --help`

### 4.1. `--help`标志的常见别名

- `-help, -h, -?, -H`

### 4.2. 详细程度的层次

一些CLI允许用户要求不同级别的帮助。

同样，git CLI在我们使用`-h`时打印命令的概要，简要解释如何使用它，但在我们使用`--help`时重定向到离线HTML文档：
- 简短版本
  - `git <command> -h`
- 离线HTML文档
  - `git <command> --help`

但这也并不是强制的规则，没有具体的标准

---

### 4.3. `help`命令

一些CLI还提供了一个help命令，通常提供比`--help`标志更详细的信息：
`program help <command-name>`

例如，当我们使用help命令时，dotnet CLI和npm CLI都会打开浏览器并将你重定向到命令的完整文档：
- `npm help <command>`


---

## 5. CLI描述语法约定

```sh
❯ rg -h
USAGE:
    rg [OPTIONS] PATTERN [PATH ...]

❯ mv -h
usage: mv [-f | -i | -n] [-hv] source target
       mv [-f | -i | -n] [-v] source ... directory
```

- 必需参数: 通常仅使用参数名称表示，尽管在某些情况下，你可能会发现它们被放在尖括号之间

- 可选参数: 可选参数通常使用方括号表示

- 可以接收多个值的参数: 省略号表示参数/选项期望多个值。它可以应用于可选或必需参数。



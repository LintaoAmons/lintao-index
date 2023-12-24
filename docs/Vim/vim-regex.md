# Vim 正则

概念的描述在后面，我们先直接上用例，当你觉得熟悉了之后，再去看看概念，就会瞬间理解了


## 用例

### 多行合并

```
line 1
line 2
line 3
```

1. **选择文本**：首先，需要选择要合并的文本行。这可以通过在视觉模式（Visual mode）中选择，或者使用命令范围指定。

2. **应用替换命令**：一旦选择了文本，就可以应用替换命令。在示例中，`:'<,'>s/\n/,` 是这个命令的一个形式。这里是它的详细解释：
   
   - `:'<,'>`：这部分指定了命令的范围，即当前选择的文本块。`'<` 和 `'>` 分别是选择区域的开始和结束。
   
   - `s`：这是替换命令。
   
   - `/\n/`：这是正则表达式，`\n` 匹配换行符。
   
   - `,`：这是替换后的文本，即用逗号替换换行符。

应用该命令后，文本将变为：

```
line 1,line 2,line 3
```

此命令的一个变体是使用不同的分隔符，或者在合并时添加额外的空格或文本。例如，若要在每个逗号后添加空格，可以修改命令为 `:'<,'>s/\n/, /`。

### 删除所有空行

```
:g/^$/d
```

- `:g` 是 Vim 中的全局命令，用于对符合特定模式的所有行执行某个操作。

- `/^$/` 是正则表达式，用于匹配空行。其中，`^` 表示行的开始，`$` 表示行的结束。当这两个符号紧挨在一起时，它们匹配的是空行。

- `d` 是删除操作。在此上下文中，它会删除匹配到的每一行。

这个方法是 Vim 中处理空行的常用技巧，简洁而高效。还可以通过修改正则表达式来定制匹配模式，以适应更复杂的需求。例如，如果想删除那些只包含空格或制表符的行，可以使用类似 `:g/^\s*$/d` 的命令。在这个例子中，`\s*` 匹配任何数量的空白字符（包括空格和制表符）。

### 跨行数字递增

假设你有一个类型，是CSV文件在内存中的数据结构体，现在因为插入了新的字段在 position3, 所有 3 以及 3 以后的数字都需要递增 1

你有 70 个字段，而且每一个 position matched 的行的中间还隔着一行，下面这个复杂一点的命令可以完成这个工作

```kotlin
// Before
@CsvBindByPosition(position = 3)
val name: String? = null,
@CsvBindByPosition(position = 4)
val age: String? = null,
@CsvBindByPosition(position = 5)
val address: String? = null,
@CsvBindByPosition(position = 6)
val phone: String? = null,
// ...
@CsvBindByPosition(position = 70)
val phone2: String? = null,

// After
@CsvBindByPosition(position = 4)
val name: String? = null,
@CsvBindByPosition(position = 5)
val age: String? = null,
@CsvBindByPosition(position = 6)
val address: String? = null,
@CsvBindByPosition(position = 7)
val phone: String? = null,
// ...
@CsvBindByPosition(position = 71)
val phone2: String? = null,
```

Command: 

```
:%s/position = \zs\d\+/\=submatch(0)+1/g
```

- `%`：表示对文件中的所有行执行此命令。
- `s`：这是替换命令。
- `/position = \zs\d\+/`：这是匹配的正则表达式模式。
  - `position = `：匹配文本 "position = "。
  - `\zs`：设置匹配替换的开始位置。这里用来确保只匹配 "position = " 之后的数字，并进行替换，而不是替换掉 "position = " 文本本身。
  - `\d\+`：匹配一个或多个数字（要递增的数字）。
- `/\=submatch(0)+1`：这是替换模式。
  - `\=`：表示替换内容是一个表达式。
  - `submatch(0)+1`：取匹配到的数字（`submatch(0)`）并将其增加 1。
- `g`：此标志表示在每行上全局进行替换。

执行这个命令后，文本中的 `position` 参数中的数字将会逐一增加一。例如，`position = 3` 将变为 `position = 4`，`position = 4` 将变为 `position = 5`，依此类推。


## 概念

### 正则的四个起手式

#### 搜索 (`search`)

- **命令格式**: `/pattern`
- **含义**: 在文档中向前搜索符合特定模式（`pattern`）的文本。Vim 使用正则表达式作为搜索模式。
- **例子**: 输入 `/hello` 将会在文档中向前搜索 "hello" 这个词。

#### 替换 (`substitute`)

- **命令格式**: `:s/pattern/replacement/[flags]`
- **含义**: 在当前行（或指定范围）中查找符合 `pattern` 的文本，并将其替换为 `replacement` 文本。可以通过 `[flags]` 控制替换的行为（例如，替换所有匹配项、进行确认等）。
- **例子**: 命令 `:%s/old/new/g` 会在整个文件中查找 "old" 并将其替换为 "new"。

#### 全局 (`global`)

- **命令格式**: `:g/pattern/command`
- **含义**: 对匹配特定模式（`pattern`）的每一行执行一个 Vim 命令（`command`）。`global` 命令非常强大，可以用于执行复杂的文本操作。
- **例子**: `:g/error/d` 将会删除所有包含 "error" 的行。

#### 反向全局 (`v`)

- **命令格式**: `:v/pattern/command`
- **含义**: 与 `global` 命令相反，`v` 命令会对不匹配特定模式（`pattern`）的每一行执行一个 Vim 命令（`command`）。这允许您对不含有特定模式的行执行操作。
- **例子**: `:v/error/d` 将会删除所有不包含 "error" 的行。

`v` 命令在需要专注于不符合特定模式的文本行时非常有用，比如清除文件中的所有非错误行，只留下包含错误的行进行进一步的分析或编辑。这种命令在处理大量数据或进行复杂的文本操作时尤为重要。语言中的正则表达式有所不同，因此在使用这些命令时需要注意语法差异。


### 全局模式

在 Vim 的 `:g/pattern/command` 命令中，`command` 可以是几乎任何 Vim 正常模式下的命令。这个命令的强大之处在于它的灵活性和广泛的应用范围。以下是一些常见的 `command` 示例，这些可以在 `:g/pattern/command` 结构中使用：

1. **删除**: `d`
   - 示例: `:g/pattern/d` 会删除所有包含 `pattern` 的行。

2. **复制**: `t` 或 `copy`
   - 示例: `:g/pattern/t$` 将包含 `pattern` 的所有行复制到文件的末尾。

3. **移动**: `m`
   - 示例: `:g/pattern/m0` 将所有包含 `pattern` 的行移动到文件的开始。

4. **替换**: `s`
   - 示例: `:g/pattern/s/old/new/g` 会在所有包含 `pattern` 的行中，将 "old" 替换为 "new"。

5. **标记**: `mark` 或 `ma`
   - 示例: `:g/pattern/ma A` 将所有包含 `pattern` 的行标记为 A（你可以后续通过 `'A` 跳转到这个位置）。

6. **执行普通模式命令**: `normal` 或 `norm`
   - 示例: `:g/pattern/normal dd` 将执行普通模式下的 `dd` 命令（删除整行），对所有包含 `pattern` 的行进行操作。

7. **缩进**: `>`
   - 示例: `:g/pattern/>` 将增加所有包含 `pattern` 的行的缩进级别。

8. **取消缩进**: `<`
   - 示例: `:g/pattern/<` 将减少所有包含 `pattern` 的行的缩进级别。

9. **执行外部命令**: `!`
   - 示例: `:g/pattern/!sort` 将对包含 `pattern` 的行应用外部的 `sort` 命令。

10. **折叠**: `fold`
    - 示例: `:g/pattern/fold` 将对所有包含 `pattern` 的行创建折叠。

这些仅仅是 `:g/pattern/command` 命令可能性的一小部分示例。由于 Vim 的强大和灵活性，你可以根据需要组合使用几乎任何命令来实现复杂的文本处理操作。


未完待续...

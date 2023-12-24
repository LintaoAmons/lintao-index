# 常用的 Neovim lua api

- `lua = <lua code>`: 执行 lua code 并把结果打印出来，类似 `vim.print(vim.inspect(<lua code>))`

## 环境变量

### 查看所有环境变量

`lua = vim.fn.environ()`

### 设置环境变量

`lua vim.fn.setenv('MY_ENV_VAR', 'my_value')`

## Buffer

- `vim.api.nvim_get_current_buf()`:
   - 功能：获取当前正在编辑的缓冲区（buffer）的标识符。
   - 这个函数返回一个数字，代表当前缓冲区。在Neovim中，每个打开的文件都是在一个缓冲区中。

- `vim.api.nvim_win_get_cursor(0)`:
   - 功能：获取当前窗口中光标的位置。
   - 参数 `0` 表示当前活动窗口。
   - 这个函数返回一个包含两个元素的表（table），第一个元素是光标所在的行号（基于1的索引），第二个元素是光标在该行的列位置（基于0的索引）。

- `vim.api.nvim_buf_set_lines(buf, start, end, strict_indexing, lines)`:
   - 功能：在指定的缓冲区中设置（替换、插入或删除）行。
   - `buf` 是要操作的缓冲区的标识符。
   - `start` 和 `end` 是行号的范围（基于0的索引），用于指定哪些行将被替换或在其前后插入新行。
   - `strict_indexing` 是一个布尔值，用于控制行号索引是否严格（通常设为 `false`）。
   - `lines` 是一个包含字符串的表（table），代表要插入的新行。

### Buffer 的写操作

`vim.api.nvim_buf_set_lines` 是 Neovim 的 Lua API 中一个非常强大和常用的函数，它用于修改缓冲区（即打开的文件）中的文本内容。我们来详细解释这个函数的用法和一些常用场景。


`vim.api.nvim_buf_set_lines(buf, start, end, strict_indexing, lines)` 的参数如下：

1. `buf`: 缓冲区的标识符。这个标识符可以通过 `vim.api.nvim_get_current_buf()` 获取当前缓冲区的标识符，或者通过其他方式获取特定缓冲区的标识符。

2. `start`: 要开始修改的行号，基于 0 的索引。例如，0 表示缓冲区的第一行。

3. `end`: 修改结束的行号，同样是基于 0 的索引。这个行号不包含在修改范围内（即是开区间）。例如，若 `end` 为 3，则实际修改的行是直到第 2 行（即第 3 行之前的所有行）。

4. `strict_indexing`: 一个布尔值，用于指定索引是否严格。若为 `false`，则当 `start` 或 `end` 超出当前缓冲区的行数时，函数会自动调整它们到合法范围。

5. `lines`: 一个字符串列表（Lua 中的 table），包含要插入或替换的文本行。

#### 示例

假设我们有一个文本文件，内容如下：

```
Line 1
Line 2
Line 3
Line 4
```

我们来看几个 `vim.api.nvim_buf_set_lines` 的使用示例：

#### 示例 1：替换文本行

假设我们要替换第 2 行（"Line 2"）为 "New Line 2"：

```lua
local buf = vim.api.nvim_get_current_buf()
vim.api.nvim_buf_set_lines(buf, 1, 2, false, {"New Line 2"})
```

执行后，文件内容变为：

```
Line 1
New Line 2
Line 3
Line 4
```

#### 示例 2：插入文本行

假设我们要在第 2 行和第 3 行之间插入一行新内容 "Inserted Line"：

```lua
local buf = vim.api.nvim_get_current_buf()
vim.api.nvim_buf_set_lines(buf, 2, 2, false, {"Inserted Line"})
```

执行后，文件内容变为：

```
Line 1
Line 2
Inserted Line
Line 3
Line 4
```

#### 示例 3：删除文本行

假设我们要删除第 3 行：

```lua
local buf = vim.api.nvim_get_current_buf()
vim.api.nvim_buf_set_lines(buf, 2, 3, false, {})
```

执行后，文件内容变为：

```
Line 1
Line 2
Line 4
```


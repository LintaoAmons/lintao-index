## 在 Vim 中复制所有匹配特定模式的行

使用 `:g`（全局）命令和 `:y`（复制）命令的组合。以下是执行此操作的一般格式：

1. 首先，在 Vim 中打开你想要执行此操作的文件。
2. 然后，使用以下命令：

   ```
   :g/pattern/y A
   ```

   在这个命令中，`pattern` 是你要查找的模式。`:g` 命令将在文件中全局搜索这个模式。`/y` 命令复制（拷贝）匹配该模式的行。命令末尾的 `A` 是一个寄存器，所有匹配的行都会被添加到这个寄存器中。

3. 运行这个命令后，所有匹配模式的行都会被复制到寄存器 `A` 中。

4. 如果你想把复制的行粘贴到某处，可以使用从寄存器 `A` 粘贴的命令：

   ```
   :put A
   ```

   这将把寄存器 `A` 的内容粘贴到当前光标位置。

> 查看更多 Vim Regex 批处理用法: https://lintao-index.pages.dev/docs/Vim/vim-regex

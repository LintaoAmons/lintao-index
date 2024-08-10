# lang-core

各个编程语言共享的基础配置

```sh
├── lang-core # 共享的基础配置
│     ├── cmp.lua # 补全
│     ├── debug.lua # 调试
│     ├── find-and-replace.lua # 查找替换
│     ├── formatting.lua # 格式化
│     ├── lint.lua # 语法检查
│     ├── lsp.lua # language server protocol
│     ├── refactor.lua # 重构
│     ├── snippet.lua # 代码片段
│     ├── test.lua # 测试
│     └── treesitter.lua # 语法高亮
└── lang # 每个编程语言的配置
      ├── example.lua # 示例
      ├── go.lua # go 语言
      ├── http.lua
      ├── json.lua
      ├── jsts.lua
      ├── lua.lua
      ├── markdown.lua
      ├── prisma.lua
      ├── python.lua
      ├── sh.lua
      └── terraform.lua
```

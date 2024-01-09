# LuaSnip 沉淀自己的代码
> 你可以在 https://github.com/LintaoAmons/CoolStuffes/tree/main/lazyvim/.config/nvim/snippets/lua_snippets 找到一些例子

## 搞定 VS Code 代码片段

### 用 VS Code 插件的片段

用过 VS Code 的朋友肯定对那些方便的代码片段不陌生。要是你想在 Neovim 里继续用，LuaSnip 能帮你轻松搞定。比如，你安装了 rafamadriz/friendly-snippets 这样的插件，只要在你的 Neovim 配置里加上这么一行：

```lua
require("luasnip.loaders.from_vscode").lazy_load()
```

这样一来，Neovim 启动时就会自动把这些片段给你准备好，多方便啊！

### 弄自己的 VS Code 片段

当然，如果你有自制的 VS Code 片段也完全没问题。只需告诉 LuaSnip 你的片段在哪儿：

```lua
-- 加载你 Neovim 配置目录下的那些酷炫的自定义片段
require("luasnip.loaders.from_vscode").lazy_load({ paths = { "./my-cool-snippets" } })
```

## Lua 片段也能轻松加

### 直接用 Lua 加片段

LuaSnip 还支持用 Lua 直接加片段，比如这样：

```lua
local ls = require("luasnip")
ls.add_snippets("lua", {
  ls.parser.parse_snippet("enable", "enabled = false"),
  s("local", fmt("local {} = require('{}')", { i(1, "default"), rep(1) })),
})
```

### Lua 片段加载器更给力

如果你的 Lua 片段多到数不清，用加载器会更方便。这样你的片段可以整整齐齐地放在不同的文件里，用的时候一叫一个准：

```lua
-- 加载 '~/snippets' 目录下的 Lua 片段
require("luasnip.loaders.from_lua").load({paths = "~/snippets"})
```

## 坑

1. **片段出错：** 如果加载的片段中哪个有问题，可能那个文件里所有的snippet就都挂了。(Debug 了我半天)
2. **格式占位符：** 记得 `fmt` 里的 `{}` 和 `{{` 是不一样的，别搞混了哦！


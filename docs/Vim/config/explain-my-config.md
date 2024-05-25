---
sidebar_position: 10
---

# 我的配置解析
> 去这里看看我的 [配置](https://github.com/LintaoAmons/CoolStuffes/tree/main/lazyvim/.config/nvim)

## 配置结构

### 插件

使用了 `lazy.nvim` 作为插件管理器，`lua/plugins` 文件夹下所有的lua 文件 return 出来的 table 都会被lazy.nvim 拿去解析下载插件

- `plugins` 文件夹下有我用的插件的配置，为了更好地组织这些插件配置，又分成了几个子文件夹
    - ❶ [plugins/init.lua](./plugins/init) 是很重要的一个文件，里面用到了`import` 来引入这些子文件夹中的插件配置

<details>
<summary>点击展开详细结构</summary>
```sh
.
├── init.lua
├── lua
│   ├── config
│   │   ├── autocmds.lua
│   │   ├── keymaps.lua
│   │   ├── lazy.lua
│   │   └── options.lua
│   └── plugins
│       ├── code
│       │   ├── ai.lua
│       │   ├── ...
│       │   └── treesitter.lua
│       ├── disabled.lua
│       ├── editor
│       │   ├── aerial.lua
│       │   ├── ...
│       │   └── vim-tmux-navigator.lua
│       ├── git
│       │   ├── diffview.lua
│       │   └── gitsign.lua
│       ├── init.lua ❶ 
│       ├── lang
│       │   ├── core.lua
│       │   ├── debug-core.lua
│       │   ├── example.lua
│       │   └── yaml.lua
│       └── ui
│           ├── bufferline.lua
│           ├── ...
│           └── themes.lua
├── scratch.json
└── snippets
    ├── html.json
    ├── ...
    └── lua_snippets
        └── python.lua
```

</details>

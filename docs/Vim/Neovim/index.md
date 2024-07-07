---
sidebar_position: 10
---

# Neovim

## 我的配置

我使用过很多neovim的预配置，比如 `lunarvim`, `astronvim`, `lazyvim`,最后还是回归到了 `插件管理器+自己写配置` 的路子上来
因为只有这样才能在想要修改一些配置的时候，能够完全地自我掌控。

但是我会说那些预配置是没用的吗？不，我也是从其中吸取了很多知识，以至于现在配置里有很多东西都是去这些大佬的配置里面找出来的

其实我仍然建议小白同学先用某一种预配置，比如 `lazyvim`，这样在最开始的时候，你不用一上来就面对超级多的新东西，而只去尝试自定义某一些东西就行了

但是相信我，你在积累了足够的经验和关于neovim的知识之后，你会和我一样最终回到写自己的配置这条路来，但前面的折腾都是完全值得的，有用的。只是建议饭一口一口吃，路一步一步走，对自己的要求也是循序渐进的，可能不至于一上来吃瘪，然后就拜拜了。

我希望自己的经验能够帮助你节约到一些宝贵的时间，加入到 Neovim 中来

<a href="/getSupport" style={{marginRight: "3px"}}>
<img src="https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white" />
<span>   当然，虽然是用爱发电，如果你能给我放一点电，那真是极好的。 </span>
<img src="https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white" />
</a>

### 配置结构
> 去这里看看我的 [配置](https://github.com/LintaoAmons/CoolStuffes/tree/main/nvim/.config/nvim)

```sh
.
├── init.lua # 入口, lazy.vim 声明, 显式 require config
└── lua
    ├── config # 不依赖插件的配置
    ├── plugins # 插件
    │   ├── init.lua # 所有的其他插件folder都会在这里被显式import
    │   ├── editor-core # 核心插件：有这几个插件就可以像个不错的编辑器用了
    │   ├── editor-enhance # 根据我的需求增强编辑器
    │   ├── git # Git 相关的插件
    │   ├── lang-core # language 相关的基础配置，比如 语法高亮，自动补全，测试，debug
    │   ├── lang # 不同语言自己的配置包
    │   └── ui # neovim 的样式
    ├── snippets # 自定义的 snippets
    ├── features # 自己写的功能,通常会依赖到 util 中的方法
    └── util # 自己封装的一些常用方法，增加类型
```

### 详细讲解

- [init.lua](./plugin-manager.md)

<details>
<summary>点击展开详细结构</summary>
```sh
.
├── READMD.md
├── init.lua
├── lazy-lock.json
└── lua
    ├── config
    │   ├── autocmds.lua
    │   ├── keymaps.lua
    │   └── options.lua
    ├── features
    │   └── terminal-and-run.lua
    ├── plugins
    │   ├── dev
    │   │   └── lazydev.lua
    │   ├── editor-core
    │   │   ├── auto-close.lua
    │   │   ├── commands.lua
    │   │   ├── neo-tree.lua
    │   │   ├── telescope.lua
    │   │   └── window-tab-management.lua
    │   ├── editor-enhance
    │   │   ├── aerial.lua
    │   │   ├── bookmarks.lua
    │   │   ├── comment.lua
    │   │   ├── context-menu.lua
    │   │   ├── copy.lua
    │   │   ├── duplicate.lua
    │   │   ├── encode-decode.lua
    │   │   ├── flash.lua
    │   │   ├── fold.lua
    │   │   ├── fzf-lua.lua
    │   │   ├── multi-cursor.lua
    │   │   ├── project.lua
    │   │   ├── scratch.lua
    │   │   ├── smart-open.lua
    │   │   ├── spectrum.lua
    │   │   ├── surround.lua
    │   │   ├── terminal-and-run.lua
    │   │   ├── text-objects.lua
    │   │   ├── triptych.lua
    │   │   └── which-key.lua
    │   ├── git
    │   │   ├── diffview.lua
    │   │   └── gitsign.lua
    │   ├── init.lua
    │   ├── lang
    │   │   ├── example.lua
    │   │   ├── http.lua
    │   │   ├── json.lua
    │   │   ├── lua.lua
    │   │   ├── markdown.lua
    │   │   ├── prisma.lua
    │   │   ├── terraform.lua
    │   │   └── tsjs.lua
    │   ├── lang-core
    │   │   ├── cmp.lua
    │   │   ├── debug.lua
    │   │   ├── formatting.lua
    │   │   ├── lint.lua
    │   │   ├── lsp.lua
    │   │   ├── snippet.lua
    │   │   ├── test.lua
    │   │   ├── treesitter.lua
    │   │   └── trouble.lua
    │   └── ui
    │       ├── bufferline.lua
    │       ├── cursor-word.lua
    │       ├── dropbar.lua
    │       ├── edge.lua
    │       ├── lualine.lua
    │       ├── noice.lua
    │       ├── notify.lua
    │       ├── nui-components.lua
    │       ├── satellite.lua
    │       └── themes.lua
    ├── snippets
    └── util
        ├── base
        │   ├── fs.lua
        │   ├── git.lua
        │   ├── strings.lua
        │   ├── sys.lua
        │   └── table.lua
        ├── editor.lua
        ├── init.lua
        ├── lang.lua
        └── log.lua
```

</details>

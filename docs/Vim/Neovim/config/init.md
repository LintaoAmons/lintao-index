---
sidebar_position: 1
id: init
---

# init.lua | Plugin Manager
> lazy.vim 

我的配置有一个理念是`使用显式的配置`, 这样配合上lsp就能很方便地追根溯源，找到定义处和引用处。

在 `init.lua` 就是整个配置文件的入口，main方法，树的根，从这里出发最终就能一步步找到各个具体的细节的配置

这里也声明了plugin manager，直接用 [lazy.vim](https://www.lazyvim.org/) 就好了，不用想咯

## lazy.vim 常用的插件配置块的参数项

- 配置
    - opts: opts 的 table 将自动被作为参数传入对应插件的 setup 函数，并调用
    - config: 其值为一个函数,通常会在这里手动调用插件的setup函数，有时也会同时进行一些其他的操作
    - opts 和 config 配合能够实现一个插件在多个地方进行配置，下面有实际的例子
    - keys: 配置快捷键，一般是结合插件提供的API来配置快捷键
    - dir: 当你想使用本地插件（通常可能是你自己还在开发中的插件），可以通过指定目录来加载这个插件
    - init: init 函数总是会在刚开始的时候就执行 (这个刚开始是neovim刚开始还是插件加载刚开始啊...)
- 版本和依赖
    - tag: 声明 github 的 tag，使插件版本固定
    - branch： 声明 github 的 分支，是插件使用特定分支
    - dependencies： 声明依赖，安装插件是会同时安装对应地依赖项
- 懒加载
    - lazy： 就是说这个要懒加载
    - event：在特殊的事件发生时加载插件，常用的有 "VeryLazy"
    - ft: 在特定的文件类型时加载插件

```lua
return {
  -- 当启动 Neovim 时，应该可用的颜色方案
  {
    "folke/tokyonight.nvim",
    lazy = false, -- 确保在启动时加载这个，如果它是你的颜色方案
    priority = 1000, -- 确保在其他启动插件之前加载这个
    config = function()
      -- 在这里加载颜色方案
      vim.cmd([[colorscheme tokyonight]])
    end,
  },

  {
    "nvim-neorg/neorg",
    -- 在文件类型为 norg 时延迟加载
    ft = "norg",
    -- 这是 neorg 的选项。这将自动调用 `require("neorg").setup(opts)`
    opts = {
      load = {
        ["core.defaults"] = {},
      },
    },
  },

  {
    "dstein64/vim-startuptime",
    -- 在命令 StartupTime 时延迟加载
    -- init 在启动时被调用。Neovim 插件的配置通常应该设置在一个 init 函数中
    init = function()
      vim.g.startuptime_tries = 10
    end,
  },

  {
    "hrsh7th/nvim-cmp",
    -- 在 InsertEnter 事件上加载 cmp
    -- 当 cmp 加载时，这些依赖项将只被加载
    -- 除非另有说明，否则依赖项总是延迟加载的
    event = "InsertEnter",
    dependencies = {
      "hrsh7th/cmp-nvim-lsp",
      "hrsh7th/cmp-buffer",
    },
    config = function(_, opts)
      -- 调用 setup 函数
      require("cmp").setup(opts)
    end,
  },

  -- 如果一些代码需要从一个未加载的插件中加载模块，它将自动被加载。
  -- 因此，对于像 devicons 这样的 api 插件，我们可以始终设置 lazy=true
  { "nvim-tree/nvim-web-devicons", lazy = true },

  -- 你可以使用 VeryLazy 事件来加载那些可以
  -- 稍后加载且对初始 UI 不重要的事物
  { "stevearc/dressing.nvim", event = "VeryLazy" },

  {
    "Wansmer/treesj",
    keys = {
      { "J", "<cmd>TSJToggle<cr>", desc = "Join Toggle" },
    },
    opts = { use_default_keymaps = false, max_join_length = 150 },
  },

  {
    "monaqa/dial.nvim",
    -- 在按键上延迟加载
    -- 模式默认为 `n`。对于更高级的选项，请查看关于按键映射的部分
    keys = { "<C-a>", { "<C-x>", mode = "n" } },
  },

  -- 本地插件需要明确配置 dir
  { dir = "~/projects/secret.nvim" },

  -- 你可以使用自定义 url 来获取插件
  { url = "git@github.com:folke/noice.nvim.git" },

  -- 本地插件也可以使用 dev 选项进行配置。
  -- 这将使用 {config.dev.path}/noice.nvim/ 而不是从 Github 获取它
  -- 使用 dev 选项，你可以轻松地在本地和安装的插件版本之间切换
  { "folke/noice.nvim", dev = true },
}
```

## opts 和 config 配合封装language配置包

在我的配置中，你可能发现有 `plugin/lang-core/` 以及 `plugin/lang/` 两个文件夹

- lang-core 放了所有语言通用的基础配置，包括语法高亮的 `treesitter`, 自动补全的基础 `cmp`, 格式化 `formating` 的 `conform`

- lang 文件夹下是各个语言高内聚的配置

下面以格式化的配置为例，讲一讲 opts 和 config 两个配置项的用法

```lua title="plugin/lang/terraform.lua"
return {
  {
    "stevearc/conform.nvim", -- 配置 conform.nvim, formatting的插件
    opts = {
      formatters_by_ft = {
        tf = { "terraform_fmt" },
        terraform = { "terraform_fmt" },
        ["terraform-vars"] = { "terraform_fmt" },
      },
    },
  },
}
```

```lua title="plugin/lang-core/formatting.lua"
return {
  "stevearc/conform.nvim",

  opts = {
    formatters_by_ft = {
      lua = { "stylua" },
      -- Conform will run multiple formatters sequentially
      python = { "isort", "black" },
      xml = { "xmlformat" },
    },
  },
  config = function(_, opts)
    vim.print(opts) -- 注意这里的 print
    require("conform").setup(opts)
  end,
}
```

你会发现最后打印出来的结果是两个文件 opts merge 过后的结果
最后这个 opts 会被用于插件的 setup 函数，完成最终的配置

```lua title="output"
{
  formatters_by_ft = {
    json = { "jq" },
    lua = { "stylua" },
    python = { "isort", "black" },
    terraform = { "terraform_fmt" },
    ["terraform-vars"] = { "terraform_fmt" },
    tf = { "terraform_fmt" },
    xml = { "xmlformat" }
  }
}
```

在我写得插件中，最后 setup 的 config 会写道一个全局变量上 `vim.g.xxx_config`, 这样你就可以在nvim runtime去修改插件的配置
从而实现不用重启 nvim 而修改插件配置并生效的效果。


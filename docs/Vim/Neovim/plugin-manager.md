---
sidebar_position: 20
---

# init.lua | Plugin Manager
> lazy.vim 

## 常用的插件配置块的参数项

- 配置
    - config: 其值为一个函数,通常会在这里手动调用插件的setup函数，有时也会同时进行一些其他的操作
    - opts: opts 的 table 将自动被作为参数传入对应插件的 setup 函数，并调用
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

# 用 NEOVIM 查询 DB

> 你可以点击[这里](https://github.com/LintaoAmons/CoolStuffes/blob/main/lazyvim/.config/nvim/lua/plugins/database.lua)查看最新的配置


## 涉及到的插件:

- `kristijanhusak/vim-dadbod-ui` 
- `tpope/vim-dadbod`
- `hrsh7th/nvim-cmp`
- `kristijanhusak/vim-dadbod-completion`


## Usecase

> 我用了这个 Docker Image 起了这个一个 DB `https://github.com/ghusta/docker-postgres-world-db`

下面是一些连接参数

```properties
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "world-db"
DB_USER = "world"
DB_PASS = "world123"
```

![db-1](https://github.com/LintaoAmons/lintao-index/assets/95092244/3c176bc4-84ff-4fd9-a4ba-6b4be5a780e8)


## 完整配置

```lua title=database.lua
-- this is a lazy.nvim config
return {
  {
    "kristijanhusak/vim-dadbod-ui",
    dependencies = "tpope/vim-dadbod",
    event = "VeryLazy",
  },
  {
    "hrsh7th/nvim-cmp",
    optional = true,
    dependencies = {
      {
        "kristijanhusak/vim-dadbod-completion",
        event = "VeryLazy",
        init = function()
          vim.api.nvim_create_autocmd("FileType", {
            desc = "dadbod completion",
            group = vim.api.nvim_create_augroup("dadbod_cmp", { clear = true }),
            pattern = { "sql", "mysql", "plsql" },
            callback = function()
              require("cmp").setup.buffer({ sources = { { name = "vim-dadbod-completion" } } })
            end,
          })
        end,
      },
    },
  },
}
```

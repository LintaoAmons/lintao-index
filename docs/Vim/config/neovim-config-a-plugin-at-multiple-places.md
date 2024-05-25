---
sidebar_position: 40
---

# 在多个地方配置同一个插件

这个需求有很多应用场景

以 `mason` 为例，因为我们会有不同的文件需要配置 mason，不同的语言可能放在不同的文件中管理配置

但是每个配置需要同时生效，而不是最后一个载入的配置直接覆盖掉了整个之前的配置项

下面是来自 `Lazyvim.extra` 的 `go` 语言配置代码

```lua
-- ...
  {
    -- highlight-next-line
    "williamboman/mason.nvim", -- ❶ 配置 mason 的 opts.ensure_installed 
    opts = function(_, opts)
      opts.ensure_installed = opts.ensure_installed or {}
      vim.list_extend(opts.ensure_installed, { "goimports", "gofumpt" })
    end,
  },
  {
    "stevearc/conform.nvim",
    opts = {
      formatters_by_ft = {
        go = { "goimports", "gofumpt" },
      },
    },
  },
  {
    "mfussenegger/nvim-dap",
    optional = true,
    dependencies = {
      {
        -- highlight-next-line
        "williamboman/mason.nvim", -- ❷  又来配置 mason 的 opts.ensure_installed
        opts = function(_, opts)
          opts.ensure_installed = opts.ensure_installed or {}
          vim.list_extend(opts.ensure_installed, { "delve" })
        end,
      },
      {
        "leoluz/nvim-dap-go",
        config = true,
      },
    },
  },
-- ...
```

可以看到

1. mason 先配置了 go 语言相关的 lsp
2. 然后在 `nvim-dap` 的 `dependencies` 中，再一次配置了  mason， 但是这一次是增加了 debug 相关的 delve 

```
opts = function(_, opts)
  opts.ensure_installed = opts.ensure_installed or {}
  vim.list_extend(opts.ensure_installed, { "delve" })
end,
```

这个 fucntion 的第二个入参是当前的mason配置，之后通过 vim.list_extend 方法添加了一个元素到这个节点，保证了之前的配置存在的基础上，新增一个元素，而不是复写掉整个节点

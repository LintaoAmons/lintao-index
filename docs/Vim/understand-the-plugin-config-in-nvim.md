---
tags: ['lazyvim', 'vim', 'nvim']
---

# 理解 Lazyvim 的配置方式

There's multiple ways to config a plugin in lazy.nvim

Mainly we use `opts` or `config` to specify the config of a plugin in lazy.Nvim

You can ref to https://github.com/folke/lazy.nvim#-plugin-spec if you want to read by your self

Here I created a very simple plugin that provide with a api that you can print out the in-use configuration of this plugin

Thus to play with multiple config methods and see the final result. 

You can find the plugin at https://github.com/LintaoAmons/print-config.nvim

## Here I list some of the ways to config the plugin

### Opts

```lua title="./lua/plugin/print-config.lua"
return {
  "LintaoAmons/print-config.nvim",
  opts = {
    ...
  }
}
```

### Opts with function

```lua title="./lua/plugin/print-config.lua"
return {
  "LintaoAmons/print-config.nvim",
  opts = function (_, opts)
    ...
  end
}
```

You can do something inside the config function to modify the opts, or return a table 

### config

```lua title="./lua/plugin/print-config.lua"
return {
  "LintaoAmons/print-config.nvim",
  config = function ()
    ...
  end
}
```

## Check active config

After you finish the configuration, try `:lua require("print-config").check_config()` to see if it's behaving as expected.


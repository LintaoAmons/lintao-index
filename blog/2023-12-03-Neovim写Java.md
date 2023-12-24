# Use nvim to write JAVA

我工作的主力语言是 Kotlin, 那东西，写起来还挺舒服的，但是就是离了 IDEA 完全写不了。

那在我自己的电脑上，没有IDEA 啊，所以还是用别的语言吧，JAVA 是挣钱的根本啊，所以还是得想办法能够做到不用 IDEA 写 JAVA 就行了。

## Config with Lazyvim

### 1. Enable Java in Lazyvim Extras

Lazyvim 的 Extra 中启用 JAVA，你就基本上能够用 Neovim 写 JAVA 了

在 Vim 中输入 `LazyExtras`, 弹出的popup window 会显示类似如下的内容,自己研究下怎么Enable Java 就行了

```
  LazyVim Extras

  This is a list of all enabled/disabled LazyVim extras.
  Each extra shows the required and optional plugins it may install.
  Enable/disable extras with the <x> key

  Enabled: (14)
    ● dap.core  mason-nvim-dap.nvim  nvim-dap  nvim-dap-ui  nvim-dap-virtual-text  which-key.nvim
    // highlight-next-line
    ● lang.go  mason.nvim  neotest-go  nvim-dap-go  nvim-lspconfig  nvim-treesitter  conform.nvim  neotest  none-ls.nvim  nvim-dap
    ● lang.java  mason.nvim  nvim-jdtls  nvim-lspconfig  nvim-treesitter  which-key.nvim  nvim-dap

  Disabled: (28)
    ○ coding.codeium  codeium.nvim  nvim-cmp  lualine.nvim
```

### 2. Debug 单元测试
> https://github.com/LintaoAmons/CoolStuffes/blob/6cd43927a7ea804d9f2d496e24eb61d5dbe96df0/lazyvim/.config/nvim/lua/plugins/lang-java.lua#L106

这个需要去看看 nvim-jdtls 的 README. 如果有问题的话，可以尝试留言问我。

主要是你需要自己 compile 一下 [vscode-java-test](https://github.com/mfussenegger/nvim-jdtls#vscode-java-test-installation),

我已经试过了，是可以成功的，也蛮简单，compile 完了之后，你需要加上一行配置在已有的 JAVA Extras 上，你可以在我的配置里面找到这[一行](https://github.com/LintaoAmons/CoolStuffes/blob/6cd43927a7ea804d9f2d496e24eb61d5dbe96df0/lazyvim/.config/nvim/lua/plugins/lang-java.lua#L106).

不要看着多，其实我就是去 Lazyvim Java Extras 里面把它的配置粘贴出来放在这个文件里了，然后加上了这一句而已，你需要把路径换成你的 jar 包路径

先随便写写，有问题再来更新

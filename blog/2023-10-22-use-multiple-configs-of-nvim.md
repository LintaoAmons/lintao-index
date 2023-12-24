# 同时使用多个配置

> https://www.reddit.com/r/neovim/comments/113z6bb/switching_neovim_configs_is_easier_than_ever_now/

大家应该都知道，我们的配置文件的路径通常是 `~/.config/nvim`

但是，通过 `NVIM_APPNAME` 这个环境变量，可以使 nvim 使用 `~/.config/` 目录下的其他子目录作为配置文件存放的路径

比如

```sh
NVIM_APPNAME="tinyvim" nvim
```

这是我 `~/.config/` 目录

```sh
~/.config 
❯ tree -L 2
.
# highlight-next-line
├── nvim -> ../dotfiles/nvim/.config/nvim 我 nvim 配置的默认路径
# highlight-next-line
└── tinyvim  # NVIM_APPNAME=tinyvim 时候的配置
    └── init.lua
```

## 使用场景

> 那你就可以使用 alias 同时存在多个配置的 nvim

- 一个插件配满的版本，一个（很少/没有）插件的版本
- debug: cp 配置目录，然后更改配置查看结果
...

![show](https://github.com/LintaoAmons/lintao-index/assets/95092244/04c87db1-cf11-453e-bc0d-28bebe324da7)

# 使用 gopass 作为 password manager

> https://github.com/gopasspw/gopass
> https://www.youtube.com/watch?v=rImp8rCiPEY&t

## 为啥要用？

我这次研究这个的目的是我的 `OPENAI_API_KEY` 需要在 neovim 的 `gp.nvim` 的配置中使用

但是我的配置是公开的

之前是直接在 zshrc 里面 source 一个本地文件把环境变量写进去，这样 `gp.nvim` 就可以直接读取这个环境变量了

但是现在我用了 `neovide` 之后，这个环境变量变得不可靠（不可用），所以我需要别的方法去做这个事情

而且之前真实的项目上也用到了这个 `gopass` 工具作为 `cicd` 的密码管理工具，并且可以很好的在团队成员中间同步项目密码

所以这次我自己来研究下怎么使用这个东西

## 基本用法

安装和配置我就跳过了，大家自己研究，有问题留言交流

### 列出所有 entry | ls

![ls](https://github.com/LintaoAmons/lintao-index/assets/95092244/94ffed2b-edcf-4e11-9dd2-3bc1dac8f6bc)

### 新增一个 entry | insert & generate

![insert](https://github.com/LintaoAmons/lintao-index/assets/95092244/c50a5d4b-2df6-4afa-9fab-9ac8e573ba0d)

### 查看 entry | cat & show

![cat&show](https://github.com/LintaoAmons/lintao-index/assets/95092244/d0799d20-7748-407b-a254-54bd8ed2ea81)

# Fzf 实用完全攻略

## 安装与配置
> https://github.com/junegunn/fzf?tab=readme-ov-file#installation

点进去这个连接，repo 里面写得很清楚了

## 基础使用方法
> https://github.com/LintaoAmons/easy-commands.nvim
> 下面所有命令都是在这个仓库下进行的
> 如果你想跟着敲一遍，可以 clone 到本地动手试试

### 直接敲 fzf

```sh
fzf
```

实际上执行的是 

```sh
find * -type f | fzf
```

### 上个命令的结果交给 fzf 进行搜索

#### 搜索文档内容

```sh
cat CommandUsecase.md | fzf
```

有点类似 interactive 版本的 rg

```sh
rg -N '##' CommandUsecase.md
```

#### 搜索本文件夹内容

```sh
ls . | fzf
```

### 将 fzf 的结果用在别的命令上

#### Command expansion

> 打开 fzf 找到的结果

```sh
open $(fzf)
```

#### 将 fzf 找到的结果放到 clipboard 下次随时粘贴

```sh
fzf | tr -d '\n' | tee >(pbcopy)
```

#### 选择多个结果

```sh
fzf --multi --bind='ctrl-a:select-all'
```

```sh
cat CommandUsecase.md | fzf --multi --bind='ctrl-a:select-all' 
```

```sh
cat CommandUsecase.md | fzf --layout=reverse --multi --bind='ctrl-a:select-all' | pbcopy
```

### 实用搜索Tips

#### 查看帮助文档

```sh
fzf -h | fzf
```

#### 大小写敏感

```sh
cat CommandUsecase.md | fzf +i
```

#### 严格匹配

在需要搜索的内容前面加个 `'`,就是告诉fzf，严格匹配这个pattern

#### And
` ` 空格

#### Or
`|`

#### 以XX开头
`^`

#### 以XX结尾
`$`

#### 取反
`!`

> THX：https://thevaluable.dev/practical-guide-fzf-example/

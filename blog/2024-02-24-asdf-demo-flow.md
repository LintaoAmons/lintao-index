# 使用 asdf 来安装特定 nodejs 版本

> https://asdf-vm.com/


## Usecase

### 安装nodejs18的完整flow

1. 安装插件
> https://github.com/asdf-vm/asdf-plugins 在这里可以找到所有的插件

```sh
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

### 查看可安装的所有版本

```sh
asdf list-all nodejs
```

### 安装指定 nodejs 版本

```sh
asdf install nodejs 18.19.1
```

### 设置当前项目的 nodejs 版本为 指定版本

```sh
asdf local nodejs 18.19.1
```


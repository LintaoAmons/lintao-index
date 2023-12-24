# 我是怎样高效学习并管理沉淀我的demo库的

遇到优秀的教程时，我会跟着做一遍；有新想法或者知识点时，我会立即动手尝试。但问题在于，我通常会忘记昨天的代码是如何编写的。因此，记录和回顾变得极其重要。

在学习这些知识点时，保持简单和专注至关重要，这样在复习时就能迅速抓住核心内容，避免干扰。

我的demo库需要独立的提交历史，同时我希望能将这些demo以语言分类，放入统一的仓库中，例如我的java仓库。这里面会有`hello-world`, `jooq-setup`等项目，我可以在一个远程仓库中查看它们。

我考虑过以下方法：

- git worktree
- git submodule
- 使用脚本同时拉取/推送多个git仓库

传统的分支策略需要频繁切换上下文，编辑器重载会浪费大量时间。那么，是否有一种方式可以同时访问这些子项目的文件系统，并随时修改和提交？Git `worktree` 提供了这样的解决方案。

## Git Worktree 简介
Git `worktree` 允许你在同一仓库的不同分支上同时工作，无需切换等待。每个`worktree`都有自己的工作目录，让你可以把分支当作完全独立的项目处理。

## 工作场景
比如，你有一个Java仓库，它包含了多个子项目。每个子项目在独立的分支上开发，你希望能够无缝切换这些分支，并与一个远程仓库同步。

## 传统分支 vs. Worktree
没有`worktree`的情况下，你需要在多个分支间切换，等待编辑器重载和索引。但有了`worktree`，每个子项目都保留在自己的工作目录，独立且随时可用。

## 多远程仓库的维护挑战
如果每个子项目对应一个远程仓库，会带来维护的复杂性，比如权限管理、钩子脚本和持续集成配置。

## Worktree vs. Submodule
Submodule 允许将一个Git仓库嵌入另一个仓库中。相比之下，`worktree`提供了更简洁的工作流，无需处理子模块的同步和更新问题。

## 多敲，多积累，我的学习秘诀
以`release/lang-bases/java-worktrees`为例，你可以为`hello-world`、`jooq-setup`等子项目创建独立的`worktree`，而主仓库`main`作为主要的开发线。

```plaintext
release/lang-bases/java-worktrees 
❯ tree . -L 2 -a
.
├── hello-world
│   ├── .git
├── jooq-setup
│   ├── .git
└── main
    └── .git
```

每个目录都连接到主仓库，但可以独立提交到远程仓库，这样减少了上下文切换的成本。

## 结语
如果你在日常工作中遇到类似挑战，尝试将Git `worktree`集成到你的工作流中，它可能会成为提高效率的秘诀。

## 这两个命令就够了


```bash
# Add a new dir for branch
$ git worktree add [-b <branch>] <path> <remote>/<branch>

# Push changes of all branch to remote
git push --all origin
```


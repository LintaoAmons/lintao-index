* [Git](#git)
  * [Git的核心概念](#git的核心概念)
  * [为什么使用Git？](#为什么使用git？)
  * [Git常见工作流程](#git常见工作流程)
  * [Cheat sheet](#cheat-sheet)
    * [1. 配置](#1.-配置)
    * [2. 配置文件](#2.-配置文件)
    * [3. 创建](#3.-创建)
    * [4. 本地修改](#4.-本地修改)
    * [5. 搜索](#5.-搜索)
    * [6. 提交历史](#6.-提交历史)
    * [7. 分支与标签](#7.-分支与标签)
    * [8. 更新与发布](#8.-更新与发布)
    * [9. 合并与重置 (Rebase)](#9.-合并与重置-(rebase))
    * [10. 撤销](#10.-撤销)



# Git

Git是一种分布式版本控制系统，最初由Linus Torvalds创造，他也是Linux操作系统的发明者。

那么，什么是版本控制系统呢？简单来说，它就像是你的项目的时间机器。想象一下，你在编写代码时，可能需要回到过去的某个版本，或者与其他开发者共享你的代码。Git就是帮助你做到这些的工具。

---
## Git的核心概念

仓库（Repository）：这是存放你项目代码的地方。每个项目都有它的仓库，可以存储项目的所有文件和历史记录。
提交（Commit）：每当你完成了一段代码的修改并满意后，你就会做一个“提交”。这相当于告诉Git：“嘿，记住这个版本！”
分支（Branch）：这是管理不同版本的强大方式。你可以在主分支（通常是master或main）以外创建新的分支，进行实验或开发新功能，而不会影响主分支。
合并（Merge）：当你在分支上完成工作后，你可能会想把它合并回主分支。这就是合并的用途。
冲突（Conflict）：有时，不同的修改会冲突。Git会标记这些冲突，让你手动解决。
远程仓库（Remote Repository）：这是存放在网络上的代码仓库，例如GitHub或GitLab。你可以上传（push）你的本地修改到远程仓库，或者从远程仓库下载（pull）最新的修改。

---
## 为什么使用Git？

团队协作：Git让多人同时工作在同一个项目上变得容易。
历史记录：每个提交都有详细的历史记录和作者信息，你可以轻松地追踪每一次修改。
撤销修改：如果你做了一些错误的修改，Git可以帮助你轻松地回到之前的状态。
分支管理：Git的分支管理是其最强大的特点之一，它让开发新功能和修复bug变得井然有序。

Git是每个软件开发人员必备的工具之一。掌握它，将对你的编程生涯有巨大的帮助。我们将在接下来的课程中深入学习Git的使用方法。期待你们能用它来管理自己的项目！

---

## Git常见工作流程

1. **创建远端仓库** - 登录到如 gitee 等远端代码仓库提供商，创建远端仓库

2. **克隆仓库** - 将仓库复制（或克隆）到你的本地机器。
   ```bash
   git clone https://example.com/MyProject.git
   ```

3. **添加文件并提交** - 在你的本地仓库中添加一个文件并“提交”（保存）更改。
   ```bash
   echo "example" > example.txt
   git add example.txt
   git commit -m "Add example file"
   ```

4. **推送更改** - 将你的更改推送到主分支。
   ```bash
   git push origin master
   ```

5. **在线修改并提交** - 使用git托管工具对文件进行更改并提交。
   （这通常在网页界面上进行，不涉及命令行操作）

6. **拉取更改** - 将更改拉取到你的本地机器。
   ```bash
   git pull origin master
   ```

7. **创建分支、修改和提交** - 创建一个“分支”（版本），进行更改，提交更改。
   ```bash
   git branch new-feature
   git checkout new-feature
   # 修改文件
   git commit -am "Modify some file"
   ```

8. **打开拉取请求** - 打开一个“拉取请求”（向主分支提出更改）。
   （这通常在网页界面上进行，不涉及命令行操作）

9. **合并你的分支** - 将你的分支合并到主分支。
   ```bash
   git checkout master
   git merge new-feature
   git push origin master
   ```

---
## Cheat sheet

### 1. 配置

- **列出当前配置：**
  ```
  git config --list
  ```

- **列出仓库配置：**
  ```
  git config --local --list
  ```

- **列出全局配置：**
  ```
  git config --global --list
  ```

- **列出系统配置：**
  ```
  git config --system --list
  ```

- **设置用户名：**
  ```
  git config --global user.name “[firstname lastname]”
  ```

- **设置用户邮箱：**
  ```
  git config --global user.email “[valid-email]”
  ```

- **设置git命令输出为彩色：**
  ```
  git config --global color.ui auto
  ```

- **设置git使用的文本编辑器：**
  ```
  git config --global core.editor vi
  ```

### 2. 配置文件

- **仓库配置文件路径 [--local]:**
  ```
  <repo>/.git/config
  ```

- **用户全局配置文件路径 [--global]:**
  ```
  ~/.gitconfig
  ```

- **系统配置文件路径 [--system]:**
  ```
  /etc/gitconfig
  ```

### 3. 创建

- **复制一个已创建的仓库（SSH）:**
  ```
  git clone ssh://user@domain.com/repo.git
  ```

- **复制一个已创建的仓库（HTTP）:**
  ```
  git clone http://domain.com/user/repo.git
  ```

- **创建一个新的本地仓库:**
  ```
  git init
  ```

### 4. 本地修改

- **显示工作路径下已修改的文件：**
  ```
  git status
  ```

- **显示与上次提交版本文件的不同：**
  ```
  git diff
  ```

- **把当前所有修改添加到下次提交中：**
  ```
  git add .
  ```

- **把对某个文件的修改添加到下次提交中：**
  ```
  git add -p <file>
  ```

- **提交本地的所有修改：**
  ```
  git commit -a
  ```

- **提交之前已标记的变化：**
  ```
  git commit
  ```

- **附加消息提交：**
  ```
  git commit -m 'message here'
  ```

- **修改上次提交：**
  ```
  git commit --amend
  ```

### 5. 搜索

- **从当前目录的所有文件中查找文本内容：**
  ```
  git grep "Hello"
  ```

- **在某一版本中搜索文本：**
  ```
  git grep "Hello" v2.5
  ```

### 6. 提交历史

- **显示所有的提交记录（详细）：**
  ```
  git log
  ```

- **显示所有提交（仅提交hash和message）：**
  ```
  git log --oneline
  ```

- **显示某个用户的所有提交：**
  ```
  git log --author="username"
  ```

- **显示某个文件的所有修改：**
  ```
  git log -p <file>
  ```

- **谁，在什么时间，修改了文件的什么内容：**
  ```
  git blame <file>
  ```

### 7. 分支与标签

- **列出所有的分支：**
  ```
  git branch
  ```

- **列出所有的远端分支：**
  ```
  git branch -r
  ```

- **切换分支：**
  ```
  git checkout <branch>
  ```

- **创建并切换到新分支:**
  ```
  git checkout -b <branch>
  ```

- **删除本地分支:**
  ```
  git branch -d <branch>
  ```

- **给当前版本打标签：**
  ```
  git tag <tag-name>
  ```

### 8. 更新与发布

- **列出当前配置的远程端：**
  ```
  git remote -v
  ```

- **添加新的远程端：**
  ```
  git remote add <remote> <url>
  ```

- **将本地版本发布到远程端：**
  ```
  git push remote <remote> <branch>
  ```

- **发布标签:

**
  ```
  git push --tags
  ```

### 9. 合并与重置 (Rebase)

- **将分支合并到当前HEAD中：**
  ```
  git merge <branch>
  ```

- **将当前HEAD版本重置到分支中:**
  ```
  git rebase <branch>
  ```

### 10. 撤销

- **放弃工作目录下的所有修改：**
  ```
  git reset --hard HEAD
  ```

- **放弃某个文件的所有本地修改：**
  ```
  git checkout HEAD <file>
  ```

- **重置一个提交（通过创建一个截然不同的新提交）**
  ```
  git revert <commit>
  ```

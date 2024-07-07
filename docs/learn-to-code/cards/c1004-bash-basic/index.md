---
id: c1004-bash-basic
title: c1004-bash-basic
---

# Bash/Shell basic

- `cd`：更改到不同的目录。
- `ls`：列出当前目录的内容。
- `mkdir`：创建新目录。
- `touch`：创建新文件。
- `rm`：删除文件或目录。
- `cp`：复制文件或目录。
- `mv`：移动或重命名文件或目录。
- `echo`：将文本打印到终端。
- `cat`：连接并打印文件的内容。
- `grep`：在文件中搜索模式。
- `chmod`：更改文件或目录的权限。
- `sudo`：以管理员权限运行命令。
- `history`：显示先前执行的命令列表。
- `ps`：显示有关运行进程的信息。

```sh
Documents/playground 
❯ cd .. # 切换到上一级目录

t7ex/Documents 
❯ ls # 列出当前目录的内容
playground

t7ex/Documents 
❯ cd playground # 进入 playground 目录

Documents/playground 
❯ mkdir my_dir # 创建一个名为 my_dir 的新目录

Documents/playground 
❯ touch myfile1.txt # 创建一个名为 myfile1.txt 的新文件

Documents/playground 
❯ ls # 再次列出当前目录的内容
my_dir          myfile1.txt

Documents/playground 
❯ mv myfile1.txt my_dir/myfile2.txt # 将 myfile1.txt 移动到 my_dir 目录并重命名为 myfile2.txt

Documents/playground 
❯ ls my_dir # 列出 my_dir 目录的内容，确认文件已经移动
myfile2.txt

Documents/playground 
❯ cp my_dir/myfile2.txt my_dir/myfile3.txt # 复制 myfile2.txt 到 my_dir 目录并命名为 myfile3.txt

Documents/playground 
❯ ls my_dir # 再次列出 my_dir 目录的内容，确认文件已经复制
myfile2.txt     myfile3.txt

Documents/playground 
❯ rm my_dir/myfile2.txt # 删除 my_dir 目录中的 myfile2.txt

Documents/playground 
❯ ls my_dir # 再次列出 my_dir 目录的内容，确认文件已经删除
myfile3.txt

Documents/playground 
❯ echo "Hello, World!" > greeting.txt # 将文本 "Hello, World!" 写入 greeting.txt 文件中

Documents/playground 
❯ cat greeting.txt # 显示 greeting.txt 文件的内容
Hello, World!

Documents/playground 
❯ echo "line2" >> greeting.txt 

Documents/playground 
echo "line2" >> greeting.txt 
❯ cat greeting.txt 
Hello,world
line2

Documents/playground 
❯ grep "Hello" greeting.txt # 在 greeting.txt 文件中搜索包含 "Hello" 的行
Hello, World!

Documents/playground 
❯ chmod 755 greeting.txt # 修改 greeting.txt 文件的权限为 755

Documents/playground 
❯ sudo ps aux # 显示所有正在运行的进程，需要管理员权限

Documents/playground 
❯ history # 显示先前执行的命令列表
   1  cd ..
   2  ls
   3  cd playground
   4  mkdir my_dir
   5  touch myfile1.txt
   6  ls
   7  mv myfile1.txt my_dir/myfile2.txt
   8  ls my_dir
   9  cp my_dir/myfile2.txt my_dir/myfile3.txt
  10  ls my_dir
  11  rm my_dir/myfile2.txt
  12  ls my_dir
  13  echo "Hello, World!" > greeting.txt
  14  cat greeting.txt
  15  grep "Hello" greeting.txt
  16  chmod 755 greeting.txt
  17  sudo ps aux
  18  history
```


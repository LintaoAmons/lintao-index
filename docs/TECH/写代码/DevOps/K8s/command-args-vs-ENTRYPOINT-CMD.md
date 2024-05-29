# K8s (command&args) VS Dockerfile (ENTRYPOINT&CMD)

其实就是概念上的 `主进程/命令` 和 `参数`
## Dockerfile 中的 CMD 和 ENTRYPOINT

- `CMD`: 定义了容器启动时默认执行的命令和参数。如果运行容器时提供了其他命令和参数，`CMD` 中的内容会被覆盖。
- `ENTRYPOINT`: 定义了容器启动时必须执行的命令，即容器的主进程。`CMD` 中定义的参数可以作为 `ENTRYPOINT` 的默认参数，但如果运行容器时提供了其他参数，`CMD` 中的参数会被这些参数覆盖。
- 如果同时使用 `ENTRYPOINT` 和 `CMD`，则 `ENTRYPOINT` 指定的命令会执行，而 `CMD` 中的内容会作为参数传给 `ENTRYPOINT`。

## Kubernetes 中的 command 和 args

- `command`: 指定`主进程`, 表现上覆盖了容器启动时的默认入口命令（即 Dockerfile 中的 `ENTRYPOINT`）。
- `args`: 指定`参数`, 表现上覆盖了容器启动时的默认参数（即 Dockerfile 中的 `CMD`）,如果没有 `command` 被指定，args 的第一个就是主进程命令。
- 如果你在 Kubernetes 的 Pod 配置中使用了 `command`，Dockerfile 中的 `CMD` 和 `ENTRYPOINT` 会被覆盖。如果你在 Pod 配置中使用了 `args`，但没有使用 `command`，那么 Dockerfile 中的 `ENTRYPOINT` 将作为入口命令，而 `args` 将覆盖 Dockerfile 中的 `CMD`。


### 例子1: Dockerfile 中只有 CMD

**Dockerfile**
```Dockerfile
FROM ubuntu
CMD ["echo", "Hello, Docker!"]
```

**Kubernetes Pod yaml**
```yaml
containers:
- name: mycontainer
  image: myimage
```

**Final Command**
```
echo Hello, Docker!
```

### 例子2: Dockerfile 中只有 ENTRYPOINT

**Dockerfile**
```Dockerfile
FROM ubuntu
ENTRYPOINT ["echo"]
```

**Kubernetes Pod yaml**
```yaml
containers:
- name: mycontainer
  image: myimage
  args: ["Hello, Kubernetes!"]
```

**Final Command**
```
echo Hello, Kubernetes!
```

### 例子3: Dockerfile 中同时有 CMD 和 ENTRYPOINT

**Dockerfile**
```Dockerfile
FROM ubuntu
ENTRYPOINT ["echo"]
CMD ["Hello, Docker!"]
```

**Kubernetes Pod yaml**
```yaml
containers:
- name: mycontainer
  image: myimage
```

**Final Command**
```
echo Hello, Docker!
```

### 例子4: Dockerfile 中有 CMD 和 ENTRYPOINT，Kubernetes Pod yaml 中有 command 和 args

**Dockerfile**
```Dockerfile
FROM ubuntu
ENTRYPOINT ["echo"]
CMD ["Hello, Docker!"]
```

**Kubernetes Pod yaml**
```yaml
containers:
- name: mycontainer
  image: myimage
  command: ["cat"]
  args: ["/etc/os-release"]
```

**Final Command**
```
cat /etc/os-release
```

### 例子5: Dockerfile 中没有 CMD 和 ENTRYPOINT，Kubernetes Pod yaml 中有 command 和 args

**Dockerfile**
```Dockerfile
FROM ubuntu
```

**Kubernetes Pod yaml**
```yaml
containers:
- name: mycontainer
  image: myimage
  command: ["cat"]
  args: ["/etc/os-release"]
```

**Final Command**
```
cat /etc/os-release
```


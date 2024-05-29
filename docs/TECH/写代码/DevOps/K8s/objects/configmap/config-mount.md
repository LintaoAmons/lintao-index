# Configmap 挂载

当你在Kubernetes Pod中将ConfigMap挂载到一个卷时，ConfigMap中的每个数据项都会在容器内的文件系统中变成一个单独的文件。

==文件的名称对应于ConfigMap中的键，文件的内容对应于该键关联的值。==  
  
例如，如果你有一个如下的ConfigMap：  
  
```yaml
apiVersion: v1  
kind: ConfigMap  
metadata:  
  name: my-config  
data:  
  key1: value1  
  key2: value2  
```  

并且你在一个Pod中这样挂载它：  
  
```yaml  
apiVersion: v1  
kind: Pod  
metadata:  
  name: mypod  
spec:  
  containers:  
  - name: mycontainer  
    image: myimage  
    volumeMounts:  
    - name: config-volume  
      mountPath: /etc/config  
  volumes:  
  - name: config-volume  
    configMap:  
      name: my-config  
```  

那么，在`mycontainer`容器内，`/etc/config`目录会看起来像这样：  
  
```  
/etc/config/  
|-- key1  
|-- key2  
```  
  
如果你运行`cat /etc/config/key1`，它将输出`value1`。同样，运行`cat /etc/config/key2`将输出`value2`。  

## subpath

如果你在挂载ConfigMap时使用`subPath`，可以指定 configmap 中的某些键值对生成容器内的文件。
  
例如，如果你有一个ConfigMap，并且你在一个Pod中带有`subPath`这样挂载它：  
  
```yaml  
apiVersion: v1  
kind: Pod  
metadata:  
  name: mypod  
spec:  
  containers:  
  - name: mycontainer  
    image: myimage  
    volumeMounts:  
    - name: config-volume  
      mountPath: /etc/config/key1  
      subPath: key1  
  volumes:  
  - name: config-volume  
    configMap:  
      name: my-config  
```  

那么，在`mycontainer`容器内，`/etc/config/key1`将是一个包含`value1`的单一文件，而不是一个目录。在`subPath`中指定的键（在此例中为`key1`）决定了从ConfigMap中挂载哪个数据项。  
  
如果你运行`cat /etc/config/key1`，它将输出`value1`。`/etc/config/key2`文件将不存在，因为只有`key1`在`subPath`中被指定。  
  
![🗨](https://fonts.gstatic.com/s/e/notoemoji/15.0/1f5e8/32.png):  
所以在这个例子中 subPath 的值只能是 key1 或者 key2, 不能是其他任何的值，对吗？  
  
![🤖](https://fonts.gstatic.com/s/e/notoemoji/15.0/1f916/32.png):  
是的，你是正确的。在这个例子中，`subPath`的值只能是`key1`或`key2`。这是因为你在ConfigMap中定义了这两个键，所以只有这两个键可用作`subPath`的值。  
  
如果你在`subPath`中使用了其他的值（比如一个你没有在ConfigMap中定义的键），那么当Kubernetes试图挂载该键时，会找不到对应的文件，因此会失败。  
  
所以，确保你在`subPath`中使用的键已经在你的ConfigMap中定义。


## From env 和 From file


```sh
controlplane ~ ➜  k create cm config-from-file --from-file=config.txt
controlplane ~ ➜  echo -e "foo3=lili\nfoo4=lele" > config.txt

controlplane ~ ➜  echo -e "var1=val1\n# this is a comment\n\nvar2=val2\n#anothercomment" > config.env
controlplane ~ ➜  k create cm config-from-env --from-env-file=config.env
configmap/config-from-env created

controlplane ~ ➜  k get cm config-from-file -oyaml
apiVersion: v1
data:
  # highlight-next-line
  config.txt: | # 文件名作为 key, 文件内容作为value
    foo3=lili
    foo4=lele
kind: ConfigMap

controlplane ~ ✖ k get cm config-from-env -oyaml
apiVersion: v1
data:
  # highlight-next-line
  var1: val1 # env-file 的每一行都解析为了这里的一对键值对
  var2: val2
kind: ConfigMap

```

## 三种 Port

- `nodePort`: 集群 `Node` 的端口, 用户可以通过 `NodeIp:Port` 来访问服务
- `port`: 服务的 `Port`
- `targetPort`: `Pod` 的 `port`, 对于 svc 来说的 `target port`

- 以 Expose 命令为例: `k expose pod nginx --name=nginx-svc --port=444 --target-port=80`  
  - Expose 命令默认创建的是 `clusterIP` 类型的 `svc`
  - Also, note that, `kubectl expose pod ... type=nodePort ...` does not have an option to specify `nodePort` in its arguments. One has to create a definition file and then do a `kubectl apply -f` to get the desired port. 


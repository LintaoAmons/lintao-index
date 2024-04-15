Kubernetes从1.22版本开始支持两种类型的令牌：

- 长期令牌
- 时限令牌

## 令牌 ｜ Token
### 长期令牌
顾名思义，长期令牌是一种永不过期的令牌。因此，它的安全性较低，不建议使用。

#### 创建长期令牌

在Kubernetes 1.24版本之前，每当创建一个服务账户时，同时也会创建一个包含秘密令牌的 `Secret` 对象。这些令牌将是长期令牌，意味着它们没有过期时间。然而，在Kubernetes 1.24版本中，由于安全和可扩展性的考虑，这种做法被废弃。

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: [secret-name]
  annotations:
    kubernetes.io/service-account.name: [service-account-name]
type: kubernetes.io/service-account-token
```

### 时限令牌

从 1.22 版本开始，Kubernetes 引入了 TokenRequest API。通过这个API生成的令牌是时限令牌，会在一段时间后过期。这适用于默认服务账户和自定义服务账户。

```
kubectl create token SERVICE_ACCOUNT_NAME [options]
```

然而，一般无需手动创建令牌。以默认服务账户为例 — 当一个 Pod 设置了 `automountServiceAccountToken` 为 True 时启动，K8s 控制平面会将一个项目卷挂载到该 Pod 上。运行在节点上的 kubelet 代理会在这个卷上提供令牌。

```sh
controlplane $ k get po
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          5m14s

controlplane $ k exec nginx -- /bin/sh -c "cat /var/run/secrets/kubernetes.io/serviceaccount/token"
eyJhbGciOiJSUzI1NiIsImtpZCI6IkxSZy05cXNSX0c4TUpjZ3Z0dVNkVGlLNTdNQ0l5ay1ubGY2T3VVR3VKN0kifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzMyODQ1NDUxLCJpYXQiOjE3MDEzMDk0NTEsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJkZWZhdWx0IiwicG9kIjp7Im5hbWUiOiJuZ2lueCIsInVpZCI6ImE2Y2I3NTEyLTY0MmYtNDgyMy1hNWVhLTBlMTYwOTZiYmY5OCJ9LCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoiZGVmYXVsdCIsInVpZCI6ImEzNWQyZjg4LTQ1NjQtNDk1Yi1iOTYwLWVjMDMwYmI2NzFiMSJ9LCJ3YXJuYWZ0ZXIiOjE3MDEzMTMwNTh9LCJuYmYiOjE3MDEzMDk0NTEsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpkZWZhdWx0OmRlZmF1bHQifQ.CYz17xH-TXWEUe15HDpM5wcGUVJZpxgEfKewAT6wGeotZKkG7xAvy0SjItEwx9ANN22WXEA8xXwGORm-xZ9w4h11dRAG7YBU7NAQ6g0FtH4bDZTCYhSksCk8p00ZbYL0MJ0O-wVHqJiH6JvfkFhRv47EPY6IpsZfKWRegDHcRs7Wo6s2k9Pk6fuP8PPpi7_ZW9KNjYQudTwejoKHywqDkiDem1UzsiBkBLuQmCF0xOqsGnkW4nHOI8D1souVOuToa6M-McAEVigZKVcR95AMvBKdF2Eu7NL47L8Aa69ltAUgatQuUM-2dgstf70E9PmX4haG0OXEUvgOK7fKwz1huA
```

#### 在 pod 中使用 token

```
# TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
# curl -H "Authorization: Bearer $TOKEN" https://kubernetes/api/v1/namespaces/default/pods/ --insecure
{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "pods is forbidden: User \"system:serviceaccount:default:default\" cannot list resource \"pods\" in API group \"\" in the namespace \"default\"",
  "reason": "Forbidden",
  "details": {
    "kind": "pods"
  },
  "code": 403
}
```

因为 Pod 中的 default sa 并没有足够权限的，所以这里403了

## Usecases

### 在 POD 中调用 k8s api 获取全部 pods

1. a `sa` with `role` have `permission` to `get pods`
2. run pod with this `sa`
3. `curl` inside the pod

```sh
controlplane $ k create sa lintao
serviceaccount/lintao created

controlplane $ k create role pod-reader --verb=get,list --resource=pods
role.rbac.authorization.k8s.io/pod-reader created

controlplane $ k create rolebinding lintao-read-pods --role=pod-reader --serviceaccount=default:lintao
rolebinding.rbac.authorization.k8s.io/lintao-read-pods created

controlplane $ k run nginx --image=nginx --dry-run=client -oyaml > nginx.yaml
controlplane $ vim nginx.yaml 
controlplane $ cat nginx.yaml 
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx
  name: nginx
spec:
  serviceAccountName: lintao
  containers:
  - image: nginx
    name: nginx
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}

controlplane $ k apply -f nginx.yaml 
pod/nginx created

controlplane $ k exec -it nginx -- /bin/sh
# TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
# curl -H "Authorization: Bearer $TOKEN" https://kubernetes/api/v1/namespaces/default/pods/ --insecure
{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion": "5667"
  },
  "items": [
    {
      "metadata": {
        "name": "nginx",
        "namespace": "default",
        ...
```

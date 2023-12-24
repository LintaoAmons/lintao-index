# 数据库链接 URL 格式

```sh
protocol//[username:password@]host1[:port1][,...hostN[:portN]][/[default-db][?options]]
```

> Important:  Any reserved characters for URLs (for example, `/`, `:`, `@`, `(`, `)`, `[`, `]`, `&`, `#`, `=`, `?`, and space) that appear in any part of the connection URL must be percent encoded.

下面举两个例子:

```
postgresql://dbuser:dbpassword@localhost:5432/mydatabase?sslmode=require&connect_timeout=10
```

- `postgresql://` 被标记为“协议（Protocol）”。
- `dbuser:dbpassword` 被标记为“用户名:密码（Username:Password）”。
- `@localhost:5432` 被标记为“主机:端口（Host:Port）”。
- `/mydatabase` 被标记为“数据库名称（Database Name）”。
- `?sslmode=require` 被标记为“SSL 模式选项（SSL Mode Option）”。
- `&connect_timeout=10` 被标记为“连接超时选项（Connection Timeout Option）”。

这个图解清晰地展示了 PostgreSQL 数据库连接 URL 的结构及其各个部分的意义。

```
mongodb://mongoadmin:secret@192.168.50.230:27017
```

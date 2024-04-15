# INI

"INI" 文件格式中的 "INI" 代表 "初始化"（Initialization）。最初，INI 文件在早期的 Windows 程序中用于存储初始化数据——即程序启动时加载的设置和配置。随着时间的推移，这种格式已经成为了一种通用的配置文件格式，被各种不同平台上的应用程序所使用，而不仅仅是 Windows。尽管它的结构简单并且没有正式的标准，但由于其易读性和易用性，INI 格式仍然非常受欢迎。

```ini
; 示例 INI 配置文件

[database]
user = dbuser
password = dbpassword
host = localhost
port = 3306

[server]
ip_address = 192.168.1.1
port = 8080
max_connections = 100

[logging]
level = INFO
file = /var/log/app.log
```

1. **注释**
   - 以分号 `;` 开头的行是注释。例如，`; 示例 INI 配置文件` 这行是对整个文件的说明，不会被程序解析。

2. **节（Sections）**
   - 用方括号 `[ ]` 括起来的词语表示一个节（section）。例如，`[database]`、`[server]` 和 `[logging]` 是三个不同的节。
   - 每个节通常代表配置文件中的一个逻辑分组。

3. **键（Keys）和值（Values）**
   - 每个节包含一系列的键值对，键和值之间用等号 `=` 分隔。
   - 例如，在 `[database]` 节中，`user` 是一个键，其对应的值是 `dbuser`。

4. **配置项**
   - 在 `[database]` 节中，定义了数据库的连接信息，包括用户、密码、主机和端口。
   - `[server]` 节定义了服务器的 IP 地址、端口和最大连接数。
   - `[logging]` 节设置了日志记录的级别和日志文件的位置。

INI 文件由于其简单和易于阅读的特点，常被用于应用程序的配置。但它不支持数据类型、嵌套或数组等复杂结构，这在一些更复杂的应用场景中可能会限制其使用。

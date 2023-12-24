# Inventory

在 Ansible 中，inventory（清单）是一个核心概念，它用于定义 Ansible 可以管理的主机和组。Inventory 文件指定了 Ansible 需要连接的服务器（节点）列表，并且可以将这些服务器分组，以便于管理和执行特定的任务。

### 主要作用

1. **定义主机和组**：Inventory 让您能够列出单个主机或主机组。您可以对这些主机或组指定特定的变量和配置。

2. **组织结构**：您可以将主机按功能、地理位置、环境（如开发、测试、生产）等标准进行分组。这有助于更有效地管理和应用配置。

3. **变量分配**：Inventory 允许您为单个主机或整个组指定变量。这些变量可以在 Ansible Playbooks（剧本）中使用，以自定义配置和任务的行为。

4. **执行特定任务**：在运行 Playbook 时，您可以针对特定的主机或组执行任务，提高了操作的灵活性和精确性。

### 解决的问题

1. **批量管理**：Inventory 使得 Ansible 能够批量管理多个主机，而不是一次只处理一个。

2. **环境分离**：通过分组，您可以轻松地将不同的环境（如开发和生产）分开管理，从而减少环境间的干扰。

3. **配置复用**：通过在不同的主机或组上重用相同的 Playbook，可以提高工作效率，并确保配置的一致性。

4. **自动化和扩展性**：Inventory 支持静态和动态列表，使得 Ansible 能够在复杂的、动态变化的环境中灵活运作。

总之，Ansible 的 Inventory 提供了一种高效、灵活的方式来管理和自动化一组主机的配置和部署，从而解决了大规模自动化和配置管理的问题。

## 配置 Inventory

在 Ansible 中，Inventory 可以使用不同的格式编写，常见的有 [INI](../../Coding/config-files/ini.md) 格式和 [YAML](../../Coding/config-files/yaml-syntax.md) 格式。

### INI 格式的 Inventory 示例

```ini
# 服务器列表
server1.example.com
server2.example.com

# 数据库服务器组
[db_servers]
db1.example.com
db2.example.com

# web 服务器组，包括变量
[web_servers]
web1.example.com http_port=80 max_requests=1000
web2.example.com http_port=8080 max_requests=500

# [all:vars] 定义所有主机的变量
[all:vars]
ansible_user=myuser
```

在这个 INI 格式的示例中：
- 单独列出的主机（`server1.example.com` 和 `server2.example.com`）属于未命名的默认组。
- `[db_servers]` 和 `[web_servers]` 是自定义的组，包含了属于这些组的主机。
- `[web_servers]` 组中的主机还定义了一些特定的变量。
- `[all:vars]` 部分定义了适用于所有主机的变量。

在 Ansible 的 INI 格式的 Inventory 文件中，一行内可以有多个 `key=value` 对，这样可以为同一个主机指定多个变量。这种格式非常适合用于定义特定于主机的变量，从而在一行内就能详细描述一个主机的多个配置信息。

```ini
webserver1 ansible_host=192.168.1.101 ansible_user=admin ansible_port=22
```

在这个例子中，`webserver1` 是主机的别名，而后面的 `ansible_host=192.168.1.101`、`ansible_user=admin` 和 `ansible_port=22` 是为这个主机定义的变量：

- `ansible_host`: 指定实际的 IP 地址或主机名。
- `ansible_user`: 定义连接到该主机时使用的用户名。
- `ansible_port`: 指定 SSH 连接的端口。

这种方式的优势在于其简洁性和可读性，允许您在不占用太多空间的情况下，快速为每个主机配置多个设置。这在管理具有不同属性的大量主机时尤其有用，因为您可以直观地看到每个主机的配置，而无需在文件中跳转。

尽管这种格式在 Ansible 中非常有用，但它是 Ansible 对 INI 格式的特定应用，并不代表 INI 格式的一般性规则。在其他使用 INI 文件的上下文中，这种一行多个 `key=value` 对的做法可能并不适用。

### YAML 格式的 Inventory 示例

```yaml
all:
  hosts:
    server1.example.com:
    server2.example.com:
  children:
    db_servers:
      hosts:
        db1.example.com:
        db2.example.com:
    web_servers:
      hosts:
        web1.example.com:
          http_port: 80
          max_requests: 1000
        web2.example.com:
          http_port: 8080
          max_requests: 500
  vars:
    ansible_user: myuser
```

在这个 YAML 格式的示例中：
- `all` 是最顶层的组，包含所有的主机和子组。
- `hosts` 部分列出了属于 `all` 组的主机。
- `children` 部分包含了更具体的组（`db_servers` 和 `web_servers`），以及这些组中的主机。
- 与 INI 格式类似，`web_servers` 组中的主机定义了一些特定的变量。
- `vars` 部分定义了适用于 `all` 组下所有主机的变量。

这两种格式提供了不同的方式来组织 Inventory，选择哪一种主要取决于个人偏好和特定需求。 YAML 格式提供了更丰富的数据结构，而 INI 格式则更为简洁。

### 分组

```ini
# Sample Inventory File

# App Servers
app_node1 ansible_host=app01.xyz.com ansible_connection=ssh ansible_user=admin ansible_ssh_pass=App$Pass
app_node2 ansible_host=app02.xyz.com ansible_connection=ssh ansible_user=admin ansible_ssh_pass=App$Pass
app_node3 ansible_host=app03.xyz.com ansible_connection=ssh ansible_user=admin ansible_ssh_pass=App$Pass

# Cache Servers
cache_db1 ansible_host=cache01.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Cache$Pass
cache_db2 ansible_host=cache02.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Cache$Pass

[cache_nodes]
cache_db1
cache_db2

[app_nodes]
app_node1
app_node2
app_node3

[newyork_nodes]
cache_db1
app_node1

[seattle_nodes]
cache_db2
app_node2
app_node3

[us_nodes:children]
newyork_nodes
seattle_nodes
```

- **主机定义**：
  - 如 `app_node1 ansible_host=app01.xyz.com ...` 是对单个应用服务器的定义，包括其主机名、连接方式、用户和密码等。
  - 类似地，`cache_db1` 和 `cache_db2` 是缓存服务器的定义。

- **主机分组**：
  - `[cache_nodes]` 和 `[app_nodes]` 是两个独立的组，分别包含了缓存服务器和应用服务器。
  - 组内的条目（如 `cache_db1`）指向前面定义的主机别名。

- **地理位置分组**：
  - `[newyork_nodes]` 和 `[seattle_nodes]` 是基于地理位置的组，可能代表服务器所在的物理位置。
  - 这些组包括了属于各自位置的应用和缓存服务器。

- **嵌套组**：
  - `[us_nodes:children]` 是一个嵌套组，它包含了 `newyork_nodes` 和 `seattle_nodes` 这两个子组。
  - 使用 `:children` 后缀可以创建包含其他组的父组。

这个配置文件的结构使得 Ansible 能够以灵活的方式管理各种服务器，无论是按功能（应用 vs 缓存）、地理位置（纽约 vs 西雅图），还是更广泛的分类（如整个美国）。这样的组织方式有助于针对特定的主机或组执行特定的任务和配置，提高了 Ansible 的效率和可用性。

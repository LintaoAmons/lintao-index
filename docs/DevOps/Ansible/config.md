## 配置文件的查找顺序
Ansible 在处理配置时会按照特定的顺序查找多个配置文件，最终使用的配置取决于这些文件的顺序。以下是 Ansible 查找配置文件的典型顺序：

1. **`ANSIBLE_CONFIG` 环境变量**：如果你设置了 `ANSIBLE_CONFIG` 环境变量，Ansible 将使用此变量中指定的配置文件。

2. **当前目录中的 `ansible.cfg` 文件**：如果 Ansible 在你运行命令的当前目录找到了一个 `ansible.cfg` 文件，它会使用这个文件。

3. **用户主目录中的 `ansible.cfg` 文件**：如果在当前目录中没有找到配置文件，Ansible 将在运行 Ansible 命令的用户的主目录中查找 `ansible.cfg` 文件。

4. **`/etc/ansible/` 目录中的 `ansible.cfg` 文件**：作为最后一个搜索步骤，如果在之前的位置都没有找到配置文件，Ansible 将在 `/etc/ansible/` 目录中查找 `ansible.cfg` 文件。

这种层级结构允许用户对所有 Ansible 操作有一个全局配置（位于 `/etc/ansible/ansible.cfg`），一个特定于用户的配置（在用户的主目录中），以及一个特定于项目的配置（在项目目录中）。配置文件离当前目录越近（`ANSIBLE_CONFIG` 环境变量是最近的），其优先级就越高。

值得注意的是，一旦 Ansible 找到一个配置文件，它就会停止进一步查找并使用该文件。如果你需要修改或扩展配置，应该在按照这个顺序首先被读取的文件中进行。

如果 `ANSIBLE_CONFIG` 环境变量指定的配置文件被找到，Ansible 将==仅使用==该文件中的设置，而忽略其他所有优先级较低的配置文件中的设置，即使 `ANSIBLE_CONFIG` 指定的文件中没有包含某些字段。

在 Ansible 中，配置文件的加载是独占的，而不是累积的。这意味着一旦 Ansible 根据其搜索顺序找到一个配置文件，它就会停止继续搜索其他配置文件，并且只应用找到的那个配置文件中的设置。它不会合并来自不同配置文件的设置。因此，如果你使用 `ANSIBLE_CONFIG` 环境变量指定了一个配置文件，你需要确保该文件中包含了你需要的所有必要设置。其他位置的配置文件（例如项目目录中的 `ansible.cfg`、用户主目录中的 `ansible.cfg` 或 `/etc/ansible/ansible.cfg`）将不会被考虑。

## 修改特定配置项

上面提到，与 `java springbot` 配置不一样，`ansible` 的配置不会根据优先级进行叠加覆盖，得到最后的配置，而是只使用最先找到的配置文件

那如果要只修改特定配置项，可以考虑使用环境变量

Ansible 环境变量的命名和对应规则遵循一个比较直接的模式，将 `ansible.cfg` 文件中的配置项映射到环境变量。这里是具体的对应规则：

1. **前缀**：所有与 Ansible 相关的环境变量都以 `ANSIBLE_` 作为前缀。

2. **配置项名称**：环境变量的名称通常是其对应 `ansible.cfg` 配置项名称的大写形式。例如，`ansible.cfg` 中的 `remote_user` 配置项对应于环境变量 `ANSIBLE_REMOTE_USER`。

3. **替换点（`.`）为下划线（`_`）**：如果 `ansible.cfg` 中的配置项名称包含点（`.`），则在相应的环境变量中，这些点会被替换为下划线。

4. **避免特殊字符和空格**：环境变量名称通常不包含特殊字符或空格。

### 示例

```
[defaults]
inventory = ./inventory
remote_user = default_user
private_key_file = /path/to/private_key
```

- `ansible.cfg` 中的 `[defaults]` 部分下的 `inventory` 配置项对应的环境变量是 `ANSIBLE_INVENTORY`。
- 同样地，`remote_user` 对应于 `ANSIBLE_REMOTE_USER`。
- 如果 `ansible.cfg` 中有一个配置项名为 `private_key_file`，则相应的环境变量是 `ANSIBLE_PRIVATE_KEY_FILE`。

```bash
export ANSIBLE_INVENTORY=/path/to/inventory
export ANSIBLE_REMOTE_USER=myuser
```

这些命令会为当前的 shell 会话设置环境变量。它们直接影响 Ansible 的行为，使得 Ansible 使用这些环境变量的值而不是 `ansible.cfg` 文件中的对应值。这种方式对于临时更改配置或者在不同环境中运行 Ansible 非常有用。

## View Configuration

```
ansible-config list # Lists all configurations

ansible-config view # Shows the current config file

ansible-config dump # Shows the current settings, usefull when debug
```


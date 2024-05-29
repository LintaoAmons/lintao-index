# 重构: 嵌套容器

我不长的工作经验内，接触的历史项目，怎么说呢，可能是各种历史原因导致代码可能不那么好维护（客气），其中有一种 Pattern 让我看到就头疼，那就是嵌套好多好多层的容器类型。

比如， `Map<String, Map<String, List<String>>>` 这样的复杂嵌套结构，我知道你是一堆有层次结构的String，但我有限的大脑容量，真是没办法时刻维护每一层String的真实含义，这种难以阅读、理解和维护的代码，我会放弃维护....或者，我一定要维护（工作嘛），我可能会用下面的方法稍微重构一下，只是为了理解代码的时候更加轻松点（降低我大脑的内存消耗）。

其实这种Pattern，我重构的目标就是去掉这种嵌套的结构，用 `data class` 来显式地展出他的上下文。那重构的步骤就是 **从内到外** 一步步构建 `data class`

## 例子分析

假设我们有这样一个数据结构 `Map<String, Map<String, List<String>>>`, 我真不想他出现在我需要维护的代码仓库里面,
他太模糊，比如，下面两个例子都是这样的数据结构，但是他们表达的含义完全不一样

### 例子 1: 员工和项目信息


- 第一个 `String` 表示员工的姓名。
- 第二个 `Map<String, List<String>>` 表示员工参与的每个项目及其详细信息。

#### 重构方法

**1. 内层建模：** 首先，我们定义 `Project` 类，它包含项目名称和相关细节。

```java
class Project {
    private String name;
    // 其他项目相关的属性
}
```

**2. 中间层建模：** 然后，我们创建 `Employee` 类，包含员工姓名和他们参与的项目列表。

```java
class Employee {
    private String name;
    private List<Project> projects;
}
```

**3. 外层建模：** 最后，定义 `Company` 类，用于表示整个公司的员工信息。

```java
class Company {
    private Map<String, Employee> employees;
}
```

### 例子 2: 用户和社交媒体帖子

再来看另一个例子，同样的结构 `Map<String, Map<String, List<String>>>` 用于表示用户在不同社交媒体平台上的帖子。这里：

- 第一个 `String` 表示用户的用户名。
- 第二个 `Map<String, List<String>>` 表示用户在不同平台上的帖子。

#### 重构方法

**1. 内层建模：** 首先，定义 `Post` 类来表示一个帖子。

```java
class Post {
    private String content;
    // 其他帖子相关的属性
}
```

**2. 中间层建模：** 接着，创建 `SocialMedia` 类，它包含平台名称和帖子列表。

```java
class SocialMedia {
    private String platformName;
    private List<Post> posts;
}
```

**3. 外层建模：** 最后，定义 `User` 类，表示社交媒体上的用户及其账户信息。

```java
class User {
    private String username;
    private Map<String, SocialMedia> socialMediaAccounts;
}
```

## 重构的效果

- **提高可读性**：通过将复杂的嵌套结构转换为清晰定义的类，代码变得更加易于理解。
- **上下文清晰**：每个类都具体反映了其在应用中的角色和功能，为数据提供了清晰的上下文。
- **减少维护难度**：这种结构使得添加新功能或调整现有功能更加方便，减少了错误的可能性。


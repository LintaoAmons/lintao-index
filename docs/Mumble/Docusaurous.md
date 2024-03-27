# Docusaurous

功能很多，我把自己用到的一些记录下来


## Add Comments Function To Docusaurus

> REF:
>
> 1. https://dev.to/anshuman_bhardwaj/add-comments-to-your-docusaurus-website-in-5-minutes-3pck
> 2. https://m19v.github.io/blog/how-to-add-giscus-to-docusaurus
> 3. https://dwf.dev/blog/2022/10/27/2022/giscus-comments

## Front Matter
> https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter

```
---
slug: warpd
title: warpd --这篇文章的名字
tags: [warpd, keyboard]
---
```

## 目录页
> https://docusaurus.io/docs/sidebar/autogenerated#category-item-metadata

如果一个目录下面有这个文件 `_category_.json`，就会给该目录生成一个页面，下面是一个最简单的内容


```json
{
  "link": {
    "type": "generated-index"
  }
}
```

- 实操场景 Commit hash
    - `d1b25f7`
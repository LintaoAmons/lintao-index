## Nextjs 导出静态网站并部署到 cloudflare

Nextjs 直接在 cloudflare 上进行部署会报错，但是我也不知道啥原因

我的想法很简单，就是一个静态的网站，所以思路是简单解决，本地build出静态资源之后，直接 cloudflare 部署静态资源目录就好了

然后本来用的 template 的 README 里面写的用 `npm run export` 来导出静态资源，但是运行之后发现报错，并给出了解释网页

https://nextjs.org/docs/pages/building-your-application/deploying/static-exports


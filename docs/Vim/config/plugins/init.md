---
sidebar_position: 1
id: init
---

# plugin/init.lua
> https://github.com/folke/lazy.nvim?tab=readme-ov-file#%EF%B8%8F-importing-specs-config--opts

这个文件里面主要就是用了 `import` 来导入所有的子模块


```lua
return {
	{ import = "lazyvim.plugins.extras.test.core" },
	{ import = "lazyvim.plugins.extras.dap.core" },
	{ import = "lazyvim.plugins.extras.lang.rust" },
	{ import = "lazyvim.plugins.extras.lang.clangd" },
	{ import = "plugins.disabled" },
	{ import = "plugins.ui" },
	{ import = "plugins.code" },
	{ import = "plugins.editor" },
	{ import = "plugins.lang" },
	{ import = "plugins.git" },
}
```

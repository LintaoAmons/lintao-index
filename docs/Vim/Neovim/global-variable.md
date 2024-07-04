# 全局变量

哎呀，今天真是把我搞惨了，这个坑,

不能只是一个字段一个字段地更新，要更新就整个一起更新，重新赋值给全局变量

```
Note that setting dictionary fields directly will not write them back into
Nvim. This is because the index into the namespace simply returns a copy.
Instead the whole dictionary must be written as one. This can be achieved by
creating a short-lived temporary.

Example:

    vim.g.my_dict.field1 = 'value'  -- Does not work

    local my_dict = vim.g.my_dict   --
    my_dict.field1 = 'value'        -- Instead do
    vim.g.my_dict = my_dict         --
```

```lua
a = {}

result = {
	bookmark_lists = {},
	project_name_and_path_mapping = {
		have = "asdf",
	},
}
a.a = "asdf"
a.b = result.project_name_and_path_mapping
vim.print(a)

vim.g.something_haha = {}
vim.g.something_haha.a = "asdf"

vim.g.something_haha = {
	a = "aaa",
}
vim.print(vim.g.something_haha)
vim.g.something_haha.b = result.project_name_and_path_mapping
vim.print(vim.g.something_haha)
vim.g.something_haha.a = "heihei"
vim.print(vim.g.something_haha)

local b = vim.g.something_haha
b.a = "heihei"
vim.g.something_haha = b
vim.print(vim.g.something_haha)


-- output
-- {
--   a = "asdf",
--   b = {
--     have = "asdf"
--   }
-- }
-- {
--   a = "aaa"
-- }
-- {
--   a = "aaa"
-- }
-- {
--   a = "aaa"
-- }
-- {
--   a = "heihei"
-- }
```

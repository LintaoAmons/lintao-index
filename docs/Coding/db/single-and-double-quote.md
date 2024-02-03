## 区别

- 单引号（'）： 用于表示字符串文字。当您需要在SQL查询中包含字符串值时，您通常会将其放在单引号中。
- 双引号（"）： 双引号主要用于标识数据库对象的标识符，如表名、列名、索引名等。使用双引号可以让您创建具有特殊字符或空格的标识符，或者与SQL关键字相同的标识符。

## Demo

1. create a strange table

```sql
CREATE TABLE "MyTable" (
    "Column1 with space" integer,
    "Column2-with-dash" varchar(50),
    "Column#3" date,
    "Column$4" boolean,
    "Column%5" numeric(10,2)
);
```

2. insert some data

```sql
INSERT INTO "MyTable" ("Column1 with space", "Column2-with-dash", "Column#3", "Column$4", "Column%5")
VALUES (1, 'Value1', '2024-02-03', true, 100.50);

INSERT INTO "MyTable" ("Column1 with space", "Column2-with-dash", "Column#3", "Column$4", "Column%5")
VALUES (2, 'Value2', '2024-02-04', false, 200.75);
```

3. query the data

```sql
SELECT * FROM MyTable;
```

4. alter table

```sql
ALTER TABLE "MyTable"
ADD COLUMN "order" integer;
```

5. query the data

```sql
SELECT order FROM MyTable; -- error
SELECT "order" FROM MyTable; -- correct
```

# 选择某个字段分组下最新的record

```sql
CREATE TABLE "table_name"(
  id VARCHAR PRIMARY KEY,
  some_duplicatable_id VARCHAR NOT NULL,
  some_other_info VARCHAR,
  created_time TIMESTAMP WITH TIME ZONE,
)

-- 1. MAX sub query
-- Done after 0.312496 sec
SELECT "table_name".id, "table_name".some_duplicatable_id, "table_name".some_other_info, "table_name".created_time
FROM table_name LEFT JOIN (
	SELECT some_duplicatable_id, MAX(created_time) as max_created_time
	from table_name
	GROUP BY some_duplicatable_id
) with_max_created_time on table_name.some_duplicatable_id = with_max_created_time.some_duplicatable_id 
  AND "table_name".created_time = with_max_created_time.max_created_time
ORDER BY created_time DESC
LIMIT 10;


-- 2. DISTINCT
-- Done after 0.738822 sec
SELECT DISTINCT (some_duplicatable_id) some_duplicatable_id, id, some_other_info, created_time 
FROM table_name 
ORDER by created_time DESC
LIMIT 10;


-- 3. Window Function
-- Done after 14.556224 sec
WITH RankedRecords AS (
  SELECT id,
    some_duplicatable_id,
    some_other_info,
    created_time, 
    ROW_NUMBER() over (PARTITION by some_duplicatable_id ORDER by created_time DESC) as rn
  FROM table_name 
) 
SELECT id, some_duplicatable_id, some_other_info, created_time
FROM RankedRecords
WHERE rn = 1
ORDER BY created_time DESC
LIMIT 10;

-- 1

   id   | some_duplicatable_id | some_other_info |      created_time      
--------+----------------------+-----------------+------------------------
 89144  | 32270                | 0x14000101170   | 2031-04-30 23:49:48+00
 939189 | 40791                | 0x140003de500   | 2031-04-30 23:41:11+00
 874730 | 13230                | 0x140004d83a0   | 2031-04-30 22:57:16+00
 62080  | 29289                | 0x140000101f0   | 2031-04-30 22:11:43+00
 204721 | 10791                | 0x1400051e200   | 2031-04-30 21:50:01+00
 356485 | 31820                | 0x14000100850   | 2031-04-30 21:39:43+00
 698920 | 40484                | 0x14000101460   | 2031-04-30 21:13:35+00
 549194 | 44993                | 0x14000010820   | 2031-04-30 21:04:29+00
 611477 | 28330                | 0x1400052ef70   | 2031-04-30 20:42:19+00
 613039 | 28025                | 0x140004a8110   | 2031-04-30 20:22:05+00
(10 rows)

-- 2

 some_duplicatable_id |   id   | some_other_info |      created_time      
----------------------+--------+-----------------+------------------------
 32270                | 89144  | 0x14000101170   | 2031-04-30 23:49:48+00
 40791                | 939189 | 0x140003de500   | 2031-04-30 23:41:11+00
 13230                | 874730 | 0x140004d83a0   | 2031-04-30 22:57:16+00
 29289                | 62080  | 0x140000101f0   | 2031-04-30 22:11:43+00
 10791                | 204721 | 0x1400051e200   | 2031-04-30 21:50:01+00
 31820                | 356485 | 0x14000100850   | 2031-04-30 21:39:43+00
 40484                | 698920 | 0x14000101460   | 2031-04-30 21:13:35+00
 44993                | 549194 | 0x14000010820   | 2031-04-30 21:04:29+00
 28330                | 611477 | 0x1400052ef70   | 2031-04-30 20:42:19+00
 28025                | 613039 | 0x140004a8110   | 2031-04-30 20:22:05+00
(10 rows)


-- 3

   id   | some_duplicatable_id | some_other_info |      created_time      
--------+----------------------+-----------------+------------------------
 89144  | 32270                | 0x14000101170   | 2031-04-30 23:49:48+00
 939189 | 40791                | 0x140003de500   | 2031-04-30 23:41:11+00
 874730 | 13230                | 0x140004d83a0   | 2031-04-30 22:57:16+00
 62080  | 29289                | 0x140000101f0   | 2031-04-30 22:11:43+00
 204721 | 10791                | 0x1400051e200   | 2031-04-30 21:50:01+00
 356485 | 31820                | 0x14000100850   | 2031-04-30 21:39:43+00
 698920 | 40484                | 0x14000101460   | 2031-04-30 21:13:35+00
 549194 | 44993                | 0x14000010820   | 2031-04-30 21:04:29+00
 611477 | 28330                | 0x1400052ef70   | 2031-04-30 20:42:19+00
 613039 | 28025                | 0x140004a8110   | 2031-04-30 20:22:05+00
(10 rows)
```

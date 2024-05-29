# Pandas read data

Pandas 已经有很多 built-in 的函数用来读取数据生成 dataframe.

下面是一些代码片段，可以用来读取其他的类型数据。

## Read markdown
```python
import re
import pandas as pd 
from io import StringIO


def read_markdown_table(table_str: str) -> pd.DataFrame:
    """Read markdown table from string and return pandas DataFrame."""
    # Ref: https://stackoverflow.com/a/76184953/
    cleaned_table_str = re.sub(r'(?<=\|)( *[\S ]*? *)(?=\|)', lambda match: match.group(0).strip(), table_str)
    df = pd.read_table(StringIO(cleaned_table_str), sep="|", header=0, skipinitialspace=True) \
           .dropna(axis=1, how='all') \
           .iloc[1:]
    df.columns = df.columns.str.strip() 
    return df
```


## Read properties

```python
def properties_to_dataframe(s: str) -> pd.DataFrame:  
    # Split the string into lines  
    lines = s.split('\n')  
    # Create a dictionary to store key-value pairs  
    data = {}  
    for line in lines:  
        # Skip empty lines  
        if line.strip() == '':  
            continue  
        # Split the line into key and value  
        key, value = line.split('=')  
        # Add the key-value pair to the dictionary  
        data[key.strip()] = value.strip()  
    # Convert the dictionary to a dataframe  
    dataframe = pd.DataFrame(list(data.items()), columns=['Key', 'Value'])  
    return dataframe
```

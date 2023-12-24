# 参数太多

假设我们需要编写一个函数来计算一个定制的运动鞋订单的总价格。这个函数将接收以下五个参数，每个参数类型都不一样，而且每个参数名都有具体的含义：

1. `basePrice` (`float64`): 运动鞋的基础价格。
2. `size` (`int`): 鞋子的尺码。根据尺码，可能会对价格有所调整。
3. `customColor` (`bool`): 是否选择了自定义颜色。如果是，可能会增加额外费用。
4. `expressShipping` (`bool`): 是否选择了快速配送。快速配送将增加额外费用。
5. `discountCode` (`string`): 折扣码。如果提供了有效的折扣码，将根据折扣码减少一定的费用。

基于这些参数，我们将计算并返回订单的最终价格。以下是该函数的实现：

```go
package main

import (
	"fmt"
	"strings"
)

// CalculateShoeOrderPrice 计算定制运动鞋订单的总价格。
func CalculateShoeOrderPrice(basePrice float64, size int, customColor, expressShipping bool, discountCode string) float64 {
	totalPrice := basePrice

	// 尺码调整费用
	if size > 42 {
		totalPrice += 10 // 大尺码额外费用
	}

	// 自定义颜色费用
	if customColor {
		totalPrice += 15 // 自定义颜色额外费用
	}

	// 快速配送费用
	if expressShipping {
		totalPrice += 20 // 快速配送额外费用
	}

	// 应用折扣
	if strings.ToUpper(discountCode) == "DISCOUNT10" {
		totalPrice *= 0.9 // 10% 折扣
	}

	return totalPrice
}

func main() {
	// 示例：基础价格100，尺码44，自定义颜色，普通配送，使用10%折扣码
	finalPrice := CalculateShoeOrderPrice(100, 44, true, false, "DISCOUNT10")
	fmt.Printf("Final Price: $%.2f\n", finalPrice)
}
```

如果随着业务的变动，参数是是不稳定的，可能需要更多的Input，也可能从这个Input类型，改变成另一个Input类型

让我们增加一个参数，并在 CalculateShoeOrderPrice 函数中添加相应的逻辑。假设我们新增的参数是 rushOrder（bool 类型），它表示是否为加急订单。如果是加急订单，我们将增加额外的费用，并且可能会影响其他费用的计算。


未完待续...

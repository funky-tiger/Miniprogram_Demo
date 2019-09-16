## canvas 相关 API 记录

### 获取元素信息

- `Taro.createSelectorQuery()`

  > 返回一个 SelectorQuery 对象实例。可以在这个实例上使用 select 等方法选择节点，并使用 boundingClientRect 等方法选择需要查询的信息。

- `Taro.createSelectorQuery().boundingClientRect()`

  > 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位。其功能类似于 DOM 的 getBoundingClientRect。返回值是 nodesRef 对应的 selectorQuery。
  > 返回的节点信息中，每个节点的位置用 left、right、top、bottom、width、height 字段描述。如果提供了 callback 回调函数，在执行 selectQuery 的 exec 方
  > 法后，节点信息会在 callback 中返回。

- `Taro.createSelectorQuery().exec(fn)`

  > 执行所有的请求，请求结果按请求次序构成数组，在 callback 的第一个参数中返回。

### Canvas 能力

- `Taro.createCanvasContext("firstCanvas", this)`
  > 创建 canvas 的绘图上下文 CanvasContext 对象
- `context.setStrokeStyle`
  > 设置描边颜色
- `context.setLineWidth(2)`
  > 设置线条的宽度
- `context.setFontSize(20)`
  > 设置字体的字号
- `context.fillText(string text, number x, number y, number maxWidth)`
  > 在画布上绘制被填充的文本
- `context.draw(boolean reserve, function callback)`
  > 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。 参数 1：本次绘制是否接着上一次绘制 参数 2:绘制完成后执行的回调函数
- `context.moveTo(x, y)`
  > 把路径移动到画布中的指定点，不创建线条。用 stroke 方法来画线条
- `context.lineTo(x, y)`
  > 增加一个新点，然后创建一条从上次指定点到目标点的线。用 stroke 方法来画线条
- `context.stroke()`
  > 画出当前路径的边框。默认颜色色为黑色
- `context.clearRect(0, 0, width, height)`
  > 清除画布上在该矩形区域内的内容
- `Taro.canvasToTempFilePath(Object object, Object this)`
  > 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。

### 文件相关

- `Taro.uploadFile({Object object})`
  > 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。
- `Taro.previewImage({})`
  > 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作

## 日历相关

- Date.UTC
  > `UTC()` 方法可根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
  > `Date.UTC(year<必填>,month<必填>,day<必填>,hours<可填>,minutes<可填>,seconds<可填>,ms<可填>)` > `Date.UTC()` 方法的参数指定日期和时间，它们都是 `UTC` 时间，处于 `GMT` 时区。指定的 `UTC` 时间将转换成毫秒的形式，这样构造函数 `Date()` 和方法 `Date.setTime()` 就可以使用它了。
  > 例子

```js
var d = Date.UTC(2005, 7, 8);
document.write(d); //1123459200000
```

- `DateValue.getDay()` 方法可返回表示星期的某一天的数字。

  > `DateValue` 所指的星期中的某一天，使用本地时间。返回值是 0（周日） 到 6（周六） 之间的一个整数。

- `new Date(year, month, 0).getDate()` 获取该月份的天数

## 自定义日历问题总结

- 1. 月份切换的滚动方式
- 2. 本月份显示上/下月的剩余天
- 3. 增加多种用户交互方式

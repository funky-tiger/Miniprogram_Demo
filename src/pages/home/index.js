import Taro, { Component } from "@tarojs/taro";
import { View, Canvas, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";

@connect(({ home }) => ({
  ...home
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: "canvas签名"
  };
  constructor() {
    this.state = {
      height: 0,
      width: 0
    };
    this.context = null;
  }

  componentDidMount() {
    console.log("cloneElement", Taro);
  }

  /**记录开始点 */
  bindtouchstart = e => {
    this.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
  };

  /**记录移动点，刷新绘制 */
  bindtouchmove = e => {
    this.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
    this.context.stroke();
    this.context.draw(true);
    this.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
  };

  /**清空画布 */
  clear = () => {
    const { width, height } = this.state;
    this.context.clearRect(0, 0, width, height);
    this.context.draw();
    this.context.setStrokeStyle("#000000");
    this.context.setLineWidth(1);
    this.context.setFontSize(10);
    let str = "签名区域";
    this.context.fillText(str, 5, 16);
    this.context.draw();
  };

  /**导出图片 */
  export = () => {
    const { width, height } = this.state;
    this.context.draw(
      false,
      Taro.canvasToTempFilePath(
        {
          x: 0,
          y: 0,
          width: width,
          height: height,
          destWidth: width,
          destHeight: height,
          fileType: "jpg",
          canvasId: "myCanvas",
          success(res) {
            console.log("成功", res);
            Taro.uploadFile({
              url: "http://xxx.xxx.xxx:9016/upload",
              filePath: res.tempFilePath,
              name: "file",
              success(response) {
                var url = "http://xxx.xxx.xxx:9016/img?name=" + response.data;
                Taro.previewImage({
                  // current: url, // 当前显示图片的http链接
                  urls: [url], // 需要预览的图片http链接列表
                  fail(f) {
                    console.log(2);
                    console.error(f);
                  },
                  success(s) {
                    console.log(1);
                    console.log(s);
                  }
                });
              }
            });
          },
          fail(e) {
            console.log("失败", e);
          }
        },
        this
      )
    );
  };
  componentWillMount = () => {};

  componentDidShow = () => {
    let query = Taro.createSelectorQuery();
    const that = this;
    query.select("#myCanvas").boundingClientRect();
    console.log("cloneElement", Taro);

    query.exec(function(rect) {
      // console.log("rect", rect);
      let width = rect[0].width;
      let height = rect[0].height;
      that.setState({
        width,
        height
      });
      const context = Taro.createCanvasContext("myCanvas", this);
      that.context = context;
      context.setStrokeStyle("#000000"); //设置描边颜色
      context.setLineWidth(1);
      context.setFontSize(10);
      let str = "签名区域";
      context.fillText(str, 5, 16);
      context.draw();
    });
  };
  componentDidMount = () => {
    console.log(new Date());
    console.log(Date.now());
  };

  render() {
    return (
      <View>
        <Canvas
          canvasId='myCanvas'
          id='myCanvas'
          style={{ width: "100vw", height: "80vh" }}
          onTouchStart={this.bindtouchstart}
          onTouchMove={this.bindtouchmove}
          disableScroll
        ></Canvas>
        <View class='btn'>
          <Button size='mini' type='warn' onClick={this.clear}>
            清除
          </Button>
          <Button size='mini' type='primary' onClick={this.export}>
            提交
          </Button>
        </View>
      </View>
    );
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable taro/no-spread-in-props */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

const senior = () => {
  return function high(WarpComponent) {
    class ProxyComponent extends WarpComponent {
      getFieldDecorator(name, options) {
        console.log("获取到name和options：", name, options);
        return type => {
          console.log("获取到type：", type);
        };
      }
      // 1
      _constructor() {
        if (!this.$scope) {
          if (super._constructor) {
            super._constructor(this.props);
          }
          return;
        }
        if (super._constructor) {
          console.log("in _constructor -------------->", super._constructor);
          this.props = {
            key: "value",
            data: "通过劫持constructor，来实现小程序版本的高阶组件",
            getFieldDecorator: this.getFieldDecorator
          };
          super._constructor(this.props);
        }
      }
      // 2
      componentWillUnmount() {
        if (super.componentWillUnmount) {
          console.log("in componentWillUnmount -------------->");
          super.componentWillUnmount();
        }
      }
      // 3
      async componentWillMount() {
        console.log("in componentWillMount -------------->");
        if (super.componentWillMount) {
          // 劫持父类的componentWillMount函数
          super.componentWillMount();
        }
      }

      render() {
        return <View>123</View>;
      }
    }
    return ProxyComponent;
  };
};
export default senior;

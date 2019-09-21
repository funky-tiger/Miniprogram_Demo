import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./testdemo.module.less";

class Testdemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("test:", this);
    return <View className={styles.testdemoPage}>测试component组件</View>;
  }
}

export default Testdemo;

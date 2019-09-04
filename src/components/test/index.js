import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./test.module.less";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return <View className={styles.testPage}>{title}</View>;
  }
}

export default Test;

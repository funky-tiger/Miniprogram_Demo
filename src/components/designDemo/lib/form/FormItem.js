/* eslint-disable taro/no-spread-in-props */
import Taro, { Component } from "@tarojs/taro";
import { View, Label } from "@tarojs/components";

class TigerFormItem extends Component {
  render() {
    const { label, children } = this.props;
    console.log("TigerFormItem:", label, children);
    return (
      <View style={{ color: "pink" }}>
        {label && <Label>{label}</Label>}
        Form-Item: {children}
      </View>
    );
  }
}

export default TigerFormItem;

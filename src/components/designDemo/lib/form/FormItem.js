/* eslint-disable taro/no-spread-in-props */
import Taro, { Component } from "@tarojs/taro";
import { View, Label } from "@tarojs/components";

class FormItem extends Component {
  render() {
    const { label, children } = this.props;
    return (
      <View>
        {label && <Label>{label}</Label>}
        {children}
      </View>
    );
  }
}

export default FormItem;

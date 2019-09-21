/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { connect } from "@tarojs/redux";

@connect(({ valiDate }) => ({
  ...valiDate
}))
export default class IfromItem extends Component {
  config = {
    navigationBarTitleText: "IfromItem"
  };

  componentDidMount = () => {};
  render() {
    return (
      <View>
        我是FormItem
        <Input name='name' value='tiger' placeholder='请输入姓名' />
      </View>
    );
  }
}

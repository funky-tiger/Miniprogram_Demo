/* eslint-disable taro/no-spread-in-props */
// 组合: 1.组件Form.Item 和 2.高阶函数 Form.senior
import Taro, { Component } from "@tarojs/taro";
import { Form } from "@tarojs/components";
import TigerFormItem from "./FormItem";
import senior from "./senior";

class TigerForm extends Component {
  static TigerFormItem = TigerFormItem;
  static senior = senior;
  render() {
    //  <MyForm onSubmit={this.handleSubmit}>
    return <Form {...this.props} />;
  }
}

export default TigerForm;

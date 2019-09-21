/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Form, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import WxValidate from "../../utils/Valiedate";
// import IFormItem from "../../components/Ifrom/lib/form/index";
import {
  Ifrom,
  IfromWrap,
  IfromItem
} from "../../components/designDemo1/lib/form/index";
import TestDemo from "../../components/testdemo";
import styles from "./index.module.less";

@connect(({ valiDate }) => ({
  ...valiDate
}))
export default class Validate extends Component {
  config = {
    navigationBarTitleText: "valiDate"
  };
  constructor() {
    this.state = {
      name: "",
      phone: "",
      isSubmitAction: false
    };
    this.context = null;
    this.WxValidate = null;
  }

  componentDidMount = () => {};

  handleSubmit = response => {
    // console.log("handleSubmit", response);
  };
  render() {
    const { name, phone, isSubmitAction } = this.state;
    return (
      <View className={styles.valiDatePage}>
        <View className='weui-cells__title'>请填写个人信息</View>
        <IfromWrap>
          此处应传递FromItem
          <IfromItem />
        </IfromWrap>
      </View>
    );
  }
}

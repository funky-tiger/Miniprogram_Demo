/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Form, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import WxValidate from "../../utils/Valiedate";
// import IFormItem from "../../components/Ifrom/lib/form/index";
import { Ifrom, IfromWrap } from "../../components/designDemo1/lib/form/index";
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
        <TestDemo>
          <View className='dialog-message'>Thank you for using Taro.</View>
        </TestDemo>
        <View className='weui-cells__title'>请填写个人信息</View>
        <Ifrom
          formItem={[
            {
              style: {},
              label: "姓名",
              name: "name",
              value: "王继彪",
              placeholder: "请输入姓名",
              rules: { required: true, minlength: 2, maxlength: 5 },
              messages: {
                required: "请填写姓名",
                minlength: "字符过短",
                maxlength: "字符过长"
              }
            },
            {
              style: {},
              label: "手机号",
              name: "phone",
              value: "",
              placeholder: "请输入手机号",
              rules: { required: true, tel: true },
              messages: {
                required: "请填写手机号",
                tel: "请填写正确的手机号"
              }
            }
          ]}
          submitOption={{ text: "确定", style: { color: "skyblue" } }}
          onreceiveSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}

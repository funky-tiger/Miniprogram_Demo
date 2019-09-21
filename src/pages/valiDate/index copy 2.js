/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Form, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import WxValidate from "../../utils/Valiedate";
// import IFormItem from "../../components/Ifrom/lib/form/index";
import IfromItem from "../../components/designDemo1/lib/form/index";
import Testdemo from "../../components/testdemo";
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
      phone: ""
    };
    this.context = null;
    this.WxValidate = null;
  }

  componentDidMount = () => {
    this.initValidate();
  };

  showModal(error) {
    Taro.showModal({
      content: error.msg,
      showCancel: false
    });
  }
  //验证函数
  initValidate() {
    // this.WxValidate = new WxValidate(rules, messages);
    // // 自定义验证规则
    // this.WxValidate.addMethod(
    //   "assistance",
    //   (value, param) => {
    //     return (
    //       this.WxValidate.optional(value) ||
    //       (value.length >= 1 && value.length <= 2)
    //     );
    //   },
    //   "请勾选1-2个敲码助手"
    // );
  }

  formSubmit = e => {
    console.log("form发生了submit事件，携带的数据为：", e.detail.value);
    // const params = e.detail.value;
    // console.log(this.WxValidate);
    // //校验表单
    // if (!this.WxValidate.checkForm(params)) {
    //   const error = this.WxValidate.errorList[0];
    //   this.showModal(error);
    //   return false;
    // }
    // this.showModal({
    //   msg: "提交成功"
    // });

    //  components/IFrom/lib/form/IFormItem.js
  };
  render() {
    const { name, phone } = this.state;
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true
        // tel: true
      },
      assistance: {
        required: true,
        assistance: true
      }
    };
    const messages = {
      name: {
        required: "请填写姓名",
        minlength: "请输入正确的名称"
      },
      phone: {
        required: "请填写手机号"
        // tel: "请填写正确的手机号"
      },
      assistance: {
        required: "请填写assistance",
        assistance: "请填写assistance"
      }
    };
    return (
      <View className={styles.valiDatePage}>
        <Form onSubmit={this.formSubmit}>
          <IfromItem
            className='weui-input'
            name='name'
            value='初始化的value'
            placeholder='请输入姓名'
            rules={{ required: true, minlength: 2 }}
            messages={{
              required: "请填写姓名",
              minlength: "请输入正确的名称"
            }}
          />
          <Button formType='submit'>提交</Button>
        </Form>
        <Testdemo>666</Testdemo>
      </View>
    );
  }
}

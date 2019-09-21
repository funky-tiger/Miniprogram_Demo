/* eslint-disable react/no-unused-state */
/* eslint-disable taro/this-props-function */
/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Form, Input, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import WxValidate from "../../../../utils/Valiedate";

@connect(({ valiDate }) => ({
  ...valiDate
}))
export default class IfromWrap extends Component {
  config = {
    navigationBarTitleText: "valiDate"
  };

  constructor(props) {
    super(props);
    this.state = {
      subAction: false,
      rules: {},
      messages: {},
      errorMessage: {}
    };
  }
  componentDidMount = () => {
    // this.resolveFormItem();
    this.initValidate();
  };
  //验证函数
  initValidate() {
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
    this.WxValidate = new WxValidate(rules, messages);
    // 自定义验证规则
    this.WxValidate.addMethod(
      "assistance",
      (value, param) => {
        return (
          this.WxValidate.optional(value) ||
          (value.length >= 1 && value.length <= 2)
        );
      },
      "请勾选1-2个敲码助手"
    );
  }

  formSubmit = e => {
    const params = e.detail.value;
    console.log("验证表单:   ", params);
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      // console.log("error", error);
      this.setState({ errorMessage: error });
      // this.props.onreceiveSubmit({ status: "fail", error });
      return false;
    }
    this.setState({ errorMessage: {} });
    // this.props.onreceiveSubmit({ status: "ok", params });
  };
  render() {
    const { formItem, submitOption } = this.props;
    const { errorMessage } = this.state;
    return (
      <View>
        我是IfromWrap
        <View>{this.props.children}</View>
        {/* <Form onSubmit={this.formSubmit}>
          {this.props.children}
          <Button formType='submit'>提交</Button>
        </Form> */}
      </View>
    );
  }
}

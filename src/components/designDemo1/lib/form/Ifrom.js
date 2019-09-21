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
export default class IfromItem extends Component {
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
    this.resolveFormItem();
    // this.initValidate();
  };

  resolveFormItem = () => {
    const { formItem } = this.props;
    console.log("formItem", formItem);
    let rules = {};
    let messages = {};
    for (let i = 0; i < formItem.length; i++) {
      rules[formItem[i].name] = formItem[i].rules;
      messages[formItem[i].name] = formItem[i].messages;
    }
    console.log("rules", rules, "messages", messages);
    this.WxValidate = new WxValidate(rules, messages);
  };
  componentWillReceiveProps(props) {
    const { submitAction, onreceiveSubmit } = props;
    const { subAction } = this.state;
    // if (subAction !== submitAction) {
    //   console.log("触发submit事件");
    //   this.formSubmit();
    //   this.state({ subAction: submitAction });
    // }
  }
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
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      console.log("error", error);
      this.setState({ errorMessage: error });
      this.props.onreceiveSubmit({ status: "fail", error });
      return false;
    }
    this.setState({ errorMessage: {} });
    this.props.onreceiveSubmit({ status: "ok", params });
  };
  render() {
    const { formItem, submitOption } = this.props;
    const { errorMessage } = this.state;
    console.log("formItem", formItem);
    return (
      <View>
        <Form onSubmit={this.formSubmit}>
          <View className='weui-cells weui-cells_after-title'>
            {formItem &&
              formItem.map(item => {
                return (
                  <View key={item.name} className='weui-cell weui-cell_input'>
                    {item.label && (
                      <View className='weui-label'>{item.label}</View>
                    )}
                    <View
                      className='weui-cell__bd'
                      style={
                        errorMessage.param === item.name
                          ? { border: "1px solid red" }
                          : {}
                      }
                    >
                      <Input
                        style={item.item}
                        name={item.name}
                        value={item.value}
                        placeholder={item.placeholder}
                      />
                    </View>
                    {errorMessage.param === item.name && (
                      <View style={{ color: "red" }}>{errorMessage.msg}</View>
                    )}
                  </View>
                );
              })}
          </View>
          {submitOption && (
            <Button formType='submit' style={submitOption.style || {}}>
              {submitOption.text || "提交"}
            </Button>
          )}
        </Form>
      </View>
    );
  }
}

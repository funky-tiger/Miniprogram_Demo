/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Form, Input, Button } from "@tarojs/components";
import WxValidate from "../../utils/Valiedate";

export default class Ifrom extends Component {
  config = {
    navigationBarTitleText: "valiDate"
  };
  constructor(props) {
    super(props);
    this.state = { subAction: false };
  }

  componentDidMount = () => {
    this.resolveFormItem();
    this.initValidate();
  };

  resolveFormItem = () => {
    const { formItem } = this.props;
    console.log("formItem", this);
  };
  componentWillReceiveProps(props) {
    const { submitAction, onreceiveSubmit } = props;
    const { subAction } = this.state;
    if (subAction !== submitAction) {
      console.log("触发submit事件");
      this.state({ subAction: submitAction });
    }
  }
  showModal(error) {
    Taro.showModal({
      content: error.msg,
      showCancel: false
    });
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
  };
  render() {
    const { className, name, value, placeholder } = this.props;
    return (
      <View>
        <Form onSubmit={this.formSubmit}>
          <View className='weui-cells weui-cells_after-title'>
            <View className='weui-cell weui-cell_input'>
              <View className='weui-cell__hd'>
                <View className='weui-label'>姓名</View>
              </View>
              <View className='weui-cell__bd'>
                <Input
                  className='weui-input'
                  name='name'
                  value='name'
                  placeholder='请输入姓名'
                />
              </View>
            </View>
            <View className='weui-cell weui-cell_input weui-cell_vcode'>
              <View className='weui-cell__hd'>
                <View className='weui-label'>手机号</View>
              </View>
              <View className='weui-cell__bd'>
                <Input
                  name='phone'
                  type='number'
                  value='phone'
                  placeholder='请输入手机号'
                />
              </View>
            </View>
          </View>
          <Button formType='submit'>提交</Button>
        </Form>
      </View>
    );
  }
}

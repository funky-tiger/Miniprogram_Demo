/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import WxValidate from "../../../../utils/Valiedate";

@connect(({ valiDate }) => ({
  ...valiDate
}))
export default class IfromItem extends Component {
  config = {
    navigationBarTitleText: "valiDate"
  };

  componentDidMount = () => {
    //     rules={{ required: true, minlength: 2 }}
    //     messages={{
    //       required: "请填写姓名",
    //       minlength: "请输入正确的名称"
    // }}

    const { rules, messages } = this.props;
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
        <Input
          className={className}
          name={name}
          value={value}
          placeholder={placeholder}
        />
      </View>
    );
  }
}

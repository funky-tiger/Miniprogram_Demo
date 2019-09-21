/* eslint-disable taro/this-props-function */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import TigerForm from "../../components/designDemo/lib/form/index";

@connect(({ formDemo }) => ({
  ...formDemo
}))
@TigerForm.senior(({ formDemo }) => ({
  ...formDemo
}))
export default class Formdemo extends Component {
  config = {
    navigationBarTitleText: "formDemo"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log("Component WillMount");
  }

  componentWillUnmount() {
    console.log("Component WillUnmount");
  }

  // getDom = () => {
  //   return (
  //     <View>
  //       {this.props.getFieldDecorator("password", {
  //         rules: [
  //           { required: true, message: "请输入密码" },
  //           { min: 6, message: "密码不能少于6位" },
  //           { max: 10, message: "密码不能超过10位" }
  //         ]
  //       })("<Input />")}
  //       123
  //     </View>
  //   );
  // };
  render() {
    console.log("render~~", this.props);
    // const { getFieldDecorator } = this.props;
    // return <View>{this.getDom()}</View>;
    return (
      <View>
        {/* {getFieldDecorator("password", {
          rules: [
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码不能少于6位" },
            { max: 10, message: "密码不能超过10位" }
          ]
        })("<Input />")} */}
        123
      </View>
    );
  }
}

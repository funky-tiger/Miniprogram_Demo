import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import TigerForm from "../../components/designDemo/lib/form/index";

@connect(({ formDemo }) => ({
  ...formDemo
}))
@TigerForm.senior()
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
  render() {
    console.log("render~~", this.props);
    return <View>formDemo</View>;
  }
}

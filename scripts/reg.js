// let str = ` pages: [
//   "pages/demo/index",
//   "pages/home/index",
//   "pages/tiger/index",
//   "pages/user/index"
// ],`;

// let reg = /"pages\/[\s\S]+[^\]\,]$/gim;

// console.log(str.replace(reg, ""));
// let appReg = /pages\:.*\]\,/gim;
let str = '/* eslint-disable import/first */
import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import Home from "./pages/home";
import dva from "./utils/dva";
import models from "./models";
import { Provider } from "@tarojs/redux";
import "./app.less";

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages:["pages/home/index","pages/demo/index","pages/product/index","pages/user/index"],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "时装衣橱",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/home/index",
          text: "HoMe"
          // iconPath: './images/tab/home.png',
          // selectedIconPath: './images/tab/home-active.png',
        },
        {
          pagePath: "pages/demo/index",
          text: "DeMo"
          // iconPath: './images/tab/cart.png',
          // selectedIconPath: './images/tab/cart-active.png',
        },
        {
          pagePath: "pages/user/index",
          text: "UsEr"
          // iconPath: './images/tab/user.png',
          // selectedIconPath: './images/tab/user-active.png',
        }
      ],
      color: "#333",
      selectedColor: "#333",
      backgroundColor: "#fff",
      borderStyle: "white"
    }
  };

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
'

/* eslint-disable import/first */
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
    pages: ["pages/home/index"],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "Taro测试demo",
      navigationBarTextStyle: "black"
    }
    // tabBar: {
    //   list: [
    //     {
    //       pagePath: "pages/home/index",
    //       text: "HoMe"
    //     },
    //     {
    //       pagePath: "pages/demo/index",
    //       text: "DeMo"
    //     },
    //     {
    //       pagePath: "pages/user/index",
    //       text: "UsEr"
    //     }
    //   ],
    //   color: "#fff",
    //   selectedColor: "#333",
    //   backgroundColor: "pink",
    //   borderStyle: "white"
    // }
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

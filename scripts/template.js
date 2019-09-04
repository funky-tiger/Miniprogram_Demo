/* eslint-disable import/no-commonjs */
// 基于commonJS
const fs = require("fs");

const HOMEPAGE = "home";
const HEADERINFO = `/* \n * create by tiger \n * Time:${getNowTime()} \n */ \n`;

const dirName = process.argv[2];

if (!dirName) {
  console.log("文件夹名称不能为空！");
  console.log("示例：npm run tep test");
  process.exit(0);
}

// page
const indexTep = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import styles from './index.module.less';

@connect(({${dirName}}) => ({
  ...${dirName},
}))
export default class ${titleCase(dirName)} extends Component {
  config = {
    navigationBarTitleText: '${dirName}',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className={styles.${dirName}Page}>
        ${dirName}
      </View>
    )
  }
}
`;

// less
const lessTep = `

.${dirName}Page {
}





`;

// model
const modelTep = `import * as ${dirName}Api from './apis';

export default {
  namespace: '${dirName}',
  state: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, userDataList: [].concat(payload) };
    }
  },
  effects: {
    *effectsDemo(action, { call, put }) {
      const { status, data } = yield call(${dirName}Api.demo, {});
      if (status === "OK") {
        yield put({
          type: "save",
          payload: {
            topData: data
          }
        });
      }
    }
  }
};

`;

// apis
const apisTep = `import Request from '../../utils/request';

export const demo = data => {
  return Request({
    url: '/xxx',
    method: 'GET',
    data,
  });
};
`;

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync("index.js", indexTep);
fs.writeFileSync("index.module.less", lessTep);
fs.writeFileSync("model.js", modelTep);
fs.writeFileSync("apis.js", apisTep);

// reload app.js

// from [/src/pages/..] to [/src/..]
process.chdir("../../");
let appStr = fs.readFileSync("app.js", "utf-8");
let pagesDir = fs.readdirSync("./pages", "utf-8");
pagesDir = pagesDir.filter(item => {
  return item !== ".DS_Store" && item !== "home";
});
pagesDir.unshift(HOMEPAGE);
let setPagesDir = [];
pagesDir.forEach(item => {
  // get all pages name from /pages/...
  setPagesDir.push("pages/" + item + "/index");
});
// 以防万一 转字符串
setPagesDir = JSON.stringify(setPagesDir);
// console.log("setPagesDir", setPagesDir);
// reg规则
// 无空格匹配任意字母
// let appReg = /pages:\s+\[([\s\S]+?)\]/;
// 多行匹配 整体替换
// let appReg = /"pages\/[\s\S]+[^\]\,]/im;
// 仅支持一行匹配
// let appReg = /pages\:.*\]\,/g;
// 匹配空格/s
let appReg = /pages:\s+\[([\s\S]+?)\]/;

// 替换
appStr = appStr.replace(appReg, function() {
  return `pages: ${setPagesDir}`;
});

// 写入app.js
fs.writeFileSync("app.js", appStr);
// fs.writeFileSync("app.js", HEADERINFO + appStr);

// 处理model
var modelsDir = fs.readdirSync("./pages", "utf-8");
// 过滤
modelsDir = modelsDir.filter(item => {
  return item !== ".DS_Store";
});
let newModelStr = "";
// 拼接
modelsDir.forEach((item, index) => {
  newModelStr +=
    index === modelsDir.length - 1
      ? `import ${item} from "../pages/${item}/model";\n\n`
      : `import ${item} from "../pages/${item}/model";\n`;
});

let exportStr = `export default [${modelsDir}];`;
// 组合
let finalExportStr = HEADERINFO + newModelStr + exportStr;
// 写入
fs.writeFileSync("./models/index.js", finalExportStr);

console.info(
  `模版${dirName}已创建,入口app.js和models/index已重新配置.${getNowTime()}`
);

function titleCase(str) {
  const array = str.toLowerCase().split(" ");
  for (let i = 0; i < array.length; i++) {
    array[i] =
      array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(" ");
  return string;
}

function getNowTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}

// 关闭进程
process.exit(0);

/* eslint-disable import/no-commonjs */
const fs = require("fs");

// 读pages
var pagesDir = fs.readdirSync("./src/pages", "utf-8");
// 过滤
pagesDir = pagesDir.filter(item => {
  return item !== ".DS_Store";
});
let newModelStr = "";
// 拼接
pagesDir.forEach((item, index) => {
  newModelStr +=
    index === pagesDir.length - 1
      ? `import ${item} from "../pages/${item}/model";\n\n`
      : `import ${item} from "../pages/${item}/model";\n`;
});

let exportStr = `export default [${pagesDir}];`;
// 组合
let finalExportStr = newModelStr + exportStr;
// 写入
fs.writeFileSync("./src/models/index.js", finalExportStr);
// 关闭进程
process.exit(0);

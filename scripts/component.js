/* eslint-disable import/no-commonjs */
/**
 * pages页面快速生成脚本
 * 用法：npm run com `文件名`
 */

const fs = require("fs");

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
  console.log("文件夹名称不能为空！- 示例：npm run com test");
  process.exit(0);
}

//页面模板
const indexTep = `import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './${dirName}.module.less'

class ${capPirName} extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View className={styles.${dirName}Page}>

      </View>
    )
  }
}

export default ${capPirName}
`;

// less文件模版
const lessTep = `
.${dirName}Page {
    width: 100%;
 }
`;

// const interfaceTep = `
// /**
//  * ${dirName}.state 参数类型
//  *
//  * @export
//  * @interface ${capPirName}State
//  */
// export interface ${capPirName}State {}

// /**
//  * ${dirName}.props 参数类型
//  *
//  * @export
//  * @interface ${capPirName}Props
//  */
// export interface ${capPirName}Props {}
// `;

fs.mkdirSync(`./src/components/${dirName}`); // mkdir $1
process.chdir(`./src/components/${dirName}`); // cd $1

fs.writeFileSync(`index.js`, indexTep); //tsx
fs.writeFileSync(`${dirName}.module.less`, lessTep); // scss
// fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);

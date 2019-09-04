/* eslint-disable import/no-commonjs */
const fs = require("fs");

var appStr = fs.readFileSync("./src/app.js", "utf-8");
var pagesDir = fs.readdirSync("./src/pages", "utf-8");
pagesDir = pagesDir.filter(item => {
  return item !== ".DS_Store" && item !== "home";
});
pagesDir.unshift("home");
let setPagesDir = [];
pagesDir.forEach(item => {
  setPagesDir.push("pages/" + item + "/index");
});
// setPagesDir = JSON.stringify(setPagesDir);
let appReg = /pages\:.*\],/gim;

appStr = appStr.replace(appReg, `pages:${setPagesDir},`);
console.log("pagesDir", appStr);

// fs.writeFileSync("./src/app.js", appStr);

process.exit(0);

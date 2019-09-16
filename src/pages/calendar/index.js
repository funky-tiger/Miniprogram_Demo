/* eslint-disable import/first */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./index.module.less";
import { connect } from "@tarojs/redux";

@connect(({ calendar }) => ({
  ...calendar
}))
export default class Calendar extends Component {
  config = {
    navigationBarTitleText: "Date"
  };
  constructor() {
    this.state = {
      weeksChArr: ["日", "一", "二", "三", "四", "五", "六"],
      empytGrids: [], // 空的占位符
      daysArr: [], // 每月的天数
      currentYear: "", // 当前年
      currentMonth: "", // 当前月
      currentDay: "", // 当前日
      currentDayInd: "" // 当前日下标
    };
  }

  componentDidMount = () => {
    this.state.weeksChArr.map((item, index) => {
      console.log(index + " : " + item);
    });
    this.initDate();
  };

  initDate = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentDayInd = currentDay - 1;
    console.log(`日期：${currentDayInd}`);
    this.checkEmptyDays(currentYear, currentMonth);
    this.getMonthAllDays(currentYear, currentMonth);
    this.setState({
      currentYear: currentYear,
      currentMonth: currentMonth,
      currentDay,
      currentDayInd
    });
  };

  getMonthAllDays = (year, month) => {
    // 获取当前月的天数
    let _daysArr = [];
    const thisMonthDays = this.checkMonthAllDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      _daysArr.push(i);
    }
    this.setState({
      daysArr: _daysArr
    });
  };

  // 获取本月所有的天数 <返回值 天数(0)>
  checkMonthAllDays = (year, month) => {
    console.log(
      "new Date(year, month, 0).getDate()",
      new Date(year, month, 0).getDate()
    );
    return new Date(year, month, 0).getDate();
  };

  // 获取本月份的空占位符
  checkEmptyDays = (year, month) => {
    console.log("年：", year, "月：", month);
    // firstDayOfWeek 获取该月份第一天是周几
    const firstDayOfWeek = this.getFirstDayWeekOfMonth(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      // 不是周日 有占位符
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setState(
        {
          empytGrids
        },
        () => {
          console.log("empytGrids", this.state.empytGrids);
        }
      );
    } else {
      // 周日 无占位符
      this.setState(
        {
          empytGrids: []
        },
        () => {
          console.log("empytGrids", this.state.empytGrids);
        }
      );
    }
  };

  // 获取本月第一天是周几
  getFirstDayWeekOfMonth = (year, month) => {
    console.log("周几？", new Date(Date.UTC(year, month - 1, 1)).getDay());
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  };

  // 点击天
  handleClickDay = ind => {
    var _currrentDay = ind;
    this.setState({
      currentDayInd: _currrentDay
    });
    console.log(
      `${this.state.currentYear}年${this.state.currentMonth}月${_currrentDay +
        1}日`
    );
  };

  // 点击切换月份
  ToggleMonth = type => {
    const { currentYear, currentMonth } = this.state;
    switch (type) {
      case "prev":
        let newMonth_ = currentMonth - 1;
        let newYear_ = currentYear;
        if (newMonth_ < 1) {
          newYear_ = currentYear - 1;
          newMonth_ = 12;
        }
        this.getMonthAllDays(newYear_, newMonth_);
        this.checkEmptyDays(newYear_, newMonth_);
        this.setState({
          currentYear: newYear_,
          currentMonth: newMonth_
        });
        break;
      case "next":
        let _newMonth = currentMonth + 1;
        let _newYear = currentYear;
        if (_newMonth > 12) {
          _newYear = currentYear + 1;
          _newMonth = 1;
        }
        this.getMonthAllDays(_newYear, _newMonth);
        this.checkEmptyDays(_newYear, _newMonth);
        this.setState({
          currentYear: _newYear,
          currentMonth: _newMonth
        });
        break;
      default:
        return;
    }
  };

  render() {
    const {
      currentYear,
      empytGrids,
      currentMonth,
      weeksChArr,
      daysArr,
      currentDayInd
    } = this.state;
    return (
      <View className={styles.calendarPage}>
        <View className={styles.canlendarBgView}>
          <View className={styles.canlendarView}>
            <View className={styles.canlendarTopView}>
              <View
                className={styles.leftBgView}
                onClick={this.ToggleMonth.bind(this, "prev")}
              >
                <View className={styles.leftView}>《</View>
              </View>
              <View className={styles.centerView}>
                {currentYear || "--"} 年 {currentMonth || "--"} 月
              </View>
              <View
                className={styles.rightBgView}
                onClick={this.ToggleMonth.bind(this, "next")}
              >
                <View className={styles.rightView}>》</View>
              </View>
            </View>
            <View className={styles.weekBgView}>
              {/* 空日期展位符 */}
              {weeksChArr.map((item, index) => {
                return (
                  <View key={index} className={styles.weekView}>
                    {item}
                  </View>
                );
              })}
            </View>
            <View className={styles.dateBgView}>
              {empytGrids.map(item => {
                return (
                  <View key={item} className={styles.dateEmptyView}></View>
                );
              })}

              {daysArr.map((item, index) => {
                return (
                  <View
                    key={index}
                    className={styles.dateView}
                    onClick={this.handleClickDay.bind(this, index)}
                  >
                    <View className={this.checkClassName(index, currentDayInd)}>
                      {item}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View>点击日期选择</View>
        </View>
      </View>
    );
  }

  checkClassName = (index, currentDayInd) => {
    return index == currentDayInd
      ? styles.datesView + " " + styles.dateSelectView
      : styles.datesView;
  };
}

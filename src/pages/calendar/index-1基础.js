/* eslint-disable no-unused-vars */
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
    navigationBarTitleText: "DateDemo"
  };
  constructor() {
    this.state = {
      weeksChArr: ["日", "一", "二", "三", "四", "五", "六"],
      timeRangeArr: [], // 时间范围
      empytGrids: [], // 空的占位符
      daysArr: [], // 每月的天数
      currentYear: "", // 当前年
      currentMonth: "", // 当前月
      currentDay: "", // 当前日
      currentDayInd: "" // 当前日下标
    };
  }

  componentDidMount = () => {
    this.initDate();
  };

  initDate = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentDayInd = currentDay - 1;
    console.log(`日期：${currentDayInd}`);
    let timeRangeArr = this.checkMonthRange(currentYear, currentMonth);
    console.log("timeRangeArr", timeRangeArr);
    let _timeRangeArr = this.getRangeTimeArr(timeRangeArr);
    this.checkEmptyDays(currentYear, currentMonth);
    let allDays = this.getMonthAllDays(currentYear, currentMonth);
    this.setState({
      currentYear: currentYear,
      currentMonth: currentMonth,
      currentDay,
      currentDayInd,
      daysArr: allDays,
      timeRangeArr: _timeRangeArr
    });
  };

  getMonthAllDays = (year, month) => {
    console.log("几月份?", year, month);
    // 获取当前月的天数
    let _daysArr = [];
    const thisMonthDays = this.checkMonthAllDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      _daysArr.push(i);
    }
    return _daysArr;
  };

  getRangeTimeArr = arr => {
    console.log("_arr", arr);
    let _rangeAllDaysArr = [];
    for (let i = 0; i < arr.length; i++) {
      let _allDays = this.getMonthAllDays(arr[i]._year, arr[i]._month);
      _rangeAllDaysArr.push({
        year: arr[i]._year,
        month: arr[i]._month,
        days: _allDays
      });
      // _rangeAllDaysArr.push(_allDays);
    }
    console.log("_rangeAllDaysArr:", _rangeAllDaysArr);
    return _rangeAllDaysArr;
  };

  checkMonthRange = (year, month) => {
    let _RangeArr = [];

    if (month - 2 < 1) {
      _RangeArr.push({ _year: year - 1, _month: month - 2 + 12 });
    } else {
      _RangeArr.push({ _year: year, _month: month - 2 });
    }

    if (month - 1 < 1) {
      _RangeArr.push({ _year: year - 1, _month: month - 1 + 12 });
    } else {
      _RangeArr.push({ _year: year, _month: month - 1 });
    }

    _RangeArr.push({ _year: year, _month: month });

    if (month + 1 > 12) {
      _RangeArr.push({ _year: year + 1, _month: month + 1 - 12 });
    } else {
      _RangeArr.push({ _year: year, _month: month + 1 });
    }

    if (month + 2 > 12) {
      _RangeArr.push({ _year: year + 1, _month: month + 2 - 12 });
    } else {
      _RangeArr.push({ _year: year, _month: month + 2 });
    }

    return _RangeArr;
  };

  // 获取本月所有的天数 <返回值 天数(0)>
  checkMonthAllDays = (year, month) => {
    console.log("获取本月所有的天数:", new Date(year, month, 0).getDate());
    return new Date(year, month, 0).getDate();
  };

  // 获取本月份的空占位符
  checkEmptyDays = (year, month) => {
    // firstDayOfWeek 获取该月份第一天是周几
    const firstDayOfWeek = this.getFirstDayWeekOfMonth(year, month);
    console.log("本月占位符:", firstDayOfWeek);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      // 不是周日 有占位符
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setState({
        empytGrids
      });
    } else {
      // 周日 无占位符
      this.setState({
        empytGrids: []
      });
    }
  };

  // 获取本月第一天是周几
  getFirstDayWeekOfMonth = (year, month) => {
    console.log(
      "本月第一天是周几？",
      new Date(Date.UTC(year, month - 1, 1)).getDay()
    );
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  };

  // 点击天
  handleClickDay = ind => {
    var _currrentDay = ind;
    this.setState({
      currentDayInd: _currrentDay
    });
    console.log(
      `点击了：${this.state.currentYear}年${
        this.state.currentMonth
      }月${_currrentDay + 1}日`
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
        this.getMonthAllDays(newYear_, newMonth_); // 获取该月的天数
        this.checkEmptyDays(newYear_, newMonth_); // 获取该月占位符
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
      currentDayInd,
      timeRangeArr
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
                <View className={styles.leftView}>上一月</View>
              </View>
              <View className={styles.centerView}>
                {currentYear || "--"} 年 {currentMonth || "--"} 月
              </View>
              <View
                className={styles.rightBgView}
                onClick={this.ToggleMonth.bind(this, "next")}
              >
                <View className={styles.rightView}>下一月</View>
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

              {timeRangeArr.map((item, index) => {
                return item.days.map((ite, ind) => {
                  return (
                    <View
                      key={ind}
                      className={styles.dateView}
                      onClick={this.handleClickDay.bind(this, index)}
                    >
                      <View className={this.checkClassName(ind, currentDayInd)}>
                        {ite}
                      </View>
                    </View>
                  );
                });
              })}
              {/* {daysArr.map((item, index) => {
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
              })} */}
            </View>
          </View>
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

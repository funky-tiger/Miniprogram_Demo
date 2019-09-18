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
      fistMonthDistance: 0, // 第一个月份与第二个月份的间隔
      weeksChArr: ["日", "一", "二", "三", "四", "五", "六"],
      timeRangeArr: [], // 时间范围
      empytGrids: [], // 空的占位符
      daysArr: [], // 每月的天数
      currentYear: "", // 当前年
      currentMonth: "", // 当前月
      scrollYear: "", // 滑动到 年
      scrollMonth: "", // 滑动到 月
      currentDay: "", // 当前日
      currentDayInd: "", // 当前日下标
      monthHeight: 0, // 每个月份的高度
      MonthDistanceArr: [] // 月份间隔距离
    };
  }

  componentDidMount = () => {
    this.initDate();
    setTimeout(() => {
      this.checkDomInfo();
    }, 0);
  };

  initDate = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const currentDayInd = currentDay - 1;
    console.log(`日期下标：${currentDayInd}`);
    let timeRangeArr = this.checkMonthRange("init", currentYear, currentMonth); // 年月范围解析
    let allDays = this.getRangeTimeArr(timeRangeArr); // 天范围解析
    let empytGrids = this.checkEmptyDays(
      timeRangeArr[0]._year,
      timeRangeArr[0]._month
    ); // 检测首月天 的占位符
    // let allDays = this.getMonthAllDays(currentYear, currentMonth); // 仅 获取当前月的天数
    this.setState({
      currentYear: currentYear,
      currentMonth: currentMonth,
      scrollYear: currentYear,
      scrollMonth: currentMonth,
      timeRangeArr,
      empytGrids,
      currentDay,
      currentDayInd,
      daysArr: allDays
    });
  };

  // 获取当前月的天数
  getMonthAllDays = (year, month) => {
    let _daysArr = [];
    const thisMonthDays = this.checkMonthAllDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      _daysArr.push(i);
    }
    return _daysArr;
  };

  // 获取时间范围
  getRangeTimeArr = arr => {
    let _rangeAllDaysArr = [];
    for (let i = 0; i < arr.length; i++) {
      let _allDays = this.getMonthAllDays(arr[i]._year, arr[i]._month);
      let dayArr = this.resolveDayRelationshop(
        _allDays,
        arr[i]._year,
        arr[i]._month
      );
      _rangeAllDaysArr = _rangeAllDaysArr.concat(dayArr);
    }
    return _rangeAllDaysArr;
  };

  // 解析 天 月 年 之间的关系
  resolveDayRelationshop = (arr, year, month) => {
    let _arr = [];
    for (let i = 0; i < arr.length; i++) {
      _arr.push({ day: arr[i], year, month });
    }
    return _arr;
  };

  // 获取本月所有的天数
  checkMonthRange = (type, year, month) => {
    let _RangeArr = [];
    // if (type === "init" || type === "scrollToUp") {
    if (type === "scrollToUp") {
      if (month - 3 < 1) {
        _RangeArr.push({ _year: year - 1, _month: month - 3 + 12 });
      } else {
        _RangeArr.push({ _year: year, _month: month - 3 });
      }

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
    }
    if (type === "init") {
      _RangeArr.push({ _year: year, _month: month });
    }

    if (type === "init" || type === "scrollToDown") {
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

      if (month + 3 > 12) {
        _RangeArr.push({ _year: year + 1, _month: month + 3 - 12 });
      } else {
        _RangeArr.push({ _year: year, _month: month + 3 });
      }
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
      return empytGrids;
    } else {
      // 周日 无占位符
      return [];
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
  handleClickDay = time => {
    console.log("time", time);

    this.setState(
      {
        currentYear: time.year,
        currentMonth: time.month,
        scrollYear: time.year,
        scrollMonth: time.month,
        currentDay: time.day,
        currentDayInd: time.day - 1
      },
      () => {
        console.log(
          `点击了：${this.state.currentYear}年${this.state.currentMonth}月${this.state.currentDay}日`
        );
      }
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

  checkHeight = arr => {
    // 获取每月1号元素距离顶部的高度
    const { timeRangeArr } = this.state;
    let _arr = [];
    for (let i = 0; i < timeRangeArr.length - 1; i++) {
      if (arr[i] && arr[i][0] && _arr.indexOf(arr[i][0].top) == -1) {
        _arr.push(arr[i][0].top);
      }
    }
    this.setState(
      {
        MonthDistanceArr: _arr,
        fistMonthDistance: _arr[0]
      },
      () => {
        console.log("第一次MonthDistanceArr", this.state.MonthDistanceArr);
      }
    );
  };

  // 获取滚动元素Dom相关
  checkDomInfo = () => {
    const { timeRangeArr } = this.state;
    let obj = Taro.createSelectorQuery();
    const _this = this;
    for (let i = 0; i < timeRangeArr.length; i++) {
      obj
        .selectAll(
          "#tiger" + timeRangeArr[i]._year + "" + timeRangeArr[i]._month + "1"
        )
        .boundingClientRect();
      obj.exec(function(rect) {
        if (rect.length >= timeRangeArr.length) {
          if (rect.length !== 0) {
            _this.checkHeight(rect);
          }
        }
      });
    }
    obj
      .selectAll("#calendarView")
      .boundingClientRect(function(rect) {
        console.log("3-获取滚动元素Dom相关-rect", rect);

        let view_height = rect[0].height;
        let everyMonthHeight = view_height / timeRangeArr.length;

        let _arr = [];
        for (let i = 1; i < timeRangeArr.length + 1; i++) {
          _arr.push(i * (Number(everyMonthHeight.toFixed(2)) + 5));
        }
        _this.setState({
          monthHeight: Number(everyMonthHeight.toFixed(2)) + 5
        });
      })
      .exec();
  };
  handleScrolltolower = () => {
    const { timeRangeArr } = this.state;
    // 时间范围
    let _timeRangeArr = this.checkMonthRange(
      "scrollToDown",
      timeRangeArr[timeRangeArr.length - 1]._year,
      timeRangeArr[timeRangeArr.length - 1]._month
    );
    // 天数数组
    let _allDays = this.getRangeTimeArr(_timeRangeArr); // 天范围解析
    this.setState(
      {
        timeRangeArr: this.state.timeRangeArr.concat(_timeRangeArr),
        daysArr: this.state.daysArr.concat(_allDays)
      },
      () => {
        this.checkDomInfo1(this.state.timeRangeArr.concat(_timeRangeArr));
        console.log("更新数据后;", this.state.timeRangeArr, this.state.daysArr);
      }
    );
  };

  // 获取滚动元素Dom相关
  checkDomInfo1 = timeRangeArr => {
    let obj = Taro.createSelectorQuery();
    const _this = this;
    for (let i = 0; i < timeRangeArr.length; i++) {
      obj
        .selectAll(
          "#tiger" + timeRangeArr[i]._year + "" + timeRangeArr[i]._month + "1"
        )
        .boundingClientRect();
      obj.exec(function(rect) {
        if (rect.length >= timeRangeArr.length) {
          if (rect.length !== 0) {
            _this.checktest(rect);
          }
        }
      });
    }
    obj
      .selectAll("#calendarView")
      .boundingClientRect(function(rect) {
        console.log("3-获取滚动元素Dom相关-rect", rect);
        let view_height = rect[0].height;
      })
      .exec();
  };

  checktest = arr => {
    const { timeRangeArr, fistMonthDistance } = this.state;
    let _arr = [];
    for (let i = 0; i < timeRangeArr.length - 1; i++) {
      if (arr[i] && arr[i][0] && _arr.indexOf(arr[i][0].top) == -1) {
        if (arr[0][0].top < 0) {
          if (arr[i].length == 1) {
            _arr.push(arr[i][0].top + fistMonthDistance + -arr[0][0].top);
          } else {
            _arr.push(arr[i][1].top + fistMonthDistance + -arr[0][0].top);
          }
        } else {
          _arr.push(arr[i][0].top);
        }
      }
    }
    this.setState(
      {
        MonthDistanceArr: _arr
      },
      () => {
        console.log("MonthDistanceArr", this.state.MonthDistanceArr);
      }
    );
  };
  handleScrollStart = e => {
    // let current_y = e.changedTouches[0].clientY;
  };

  handleScrollEnd = e => {
    // let current_y = e.changedTouches[0].clientY;
  };
  handleScrollMove = e => {
    const { monthHeight, fistMonthDistance } = this.state;
    const _this = this;
    let obj = Taro.createSelectorQuery();
    obj
      .selectAll("#calendarView")
      .boundingClientRect(function(rect) {
        let _viewHeight = rect[0].height;
        let _scrollHeight = -(rect[0].top - fistMonthDistance);
        _this.checkDateYearMonth(_scrollHeight);
        // console.log("元素的高度:", _viewHeight, "滚动的高度:", _scrollHeight);
        // console.log(
        //   "元素底部距底部的高度:",
        //   _viewHeight - monthHeight - _scrollHeight
        // );
        if (_viewHeight - monthHeight - _scrollHeight < 200) {
          console.log("得更新了兄弟");
          _this.throttle(_this.handleScrolltolower(), 1000, { leading: false });
        }
      })
      .exec();
  };

  // 检测当前滑动到某月
  checkDateYearMonth = scrollTop => {
    const { timeRangeArr, MonthDistanceArr } = this.state;
    for (let i = 0; i < MonthDistanceArr.length; i++) {
      if (scrollTop < MonthDistanceArr[0]) {
        this.setState({
          scrollYear: timeRangeArr[0]._year,
          scrollMonth: timeRangeArr[0]._month
        });
      } else if (
        scrollTop >= MonthDistanceArr[i] &&
        scrollTop < MonthDistanceArr[i + 1]
      ) {
        this.setState({
          scrollYear: timeRangeArr[i + 1]._year,
          scrollMonth: timeRangeArr[i + 1]._month
        });
      } else if (scrollTop >= MonthDistanceArr[MonthDistanceArr.length - 1]) {
        this.setState({
          scrollYear: timeRangeArr[timeRangeArr.length - 1]._year,
          scrollMonth: timeRangeArr[timeRangeArr.length - 1]._month
        });
      }
    }
  };

  render() {
    const {
      scrollYear,
      scrollMonth,
      empytGrids,
      weeksChArr,
      daysArr,
      currentDayInd
    } = this.state;
    const scrollStyle = {
      height: "280rpx"
    };
    return (
      <View className={styles.calendarPage}>
        <View className={styles.canlendarBgView}>
          <View className={styles.canlendarView}>
            <View className={styles.dateTitle}>
              <View className={styles.canlendarTopView}>
                <View
                  className={styles.leftBgView}
                  onClick={this.ToggleMonth.bind(this, "prev")}
                >
                  <View className={styles.leftView}>上一月</View>
                </View>
                <View className={styles.centerView}>
                  {scrollYear || "--"} 年 {scrollMonth || "--"} 月
                </View>
                <View
                  className={styles.rightBgView}
                  onClick={this.ToggleMonth.bind(this, "next")}
                >
                  <View className={styles.rightView}>下一月</View>
                </View>
              </View>
              <View className={styles.weekBgView}>
                {/* 周几大写 */}
                {weeksChArr.map((item, index) => {
                  return (
                    <View key={index} className={styles.weekView}>
                      {item}
                    </View>
                  );
                })}
              </View>
            </View>

            <View
              className={styles.scrollView}
              style={{ height: scrollStyle.height }}
            >
              <View
                id='calendarView'
                onTouchMove={this.handleScrollMove}
                onTouchStart={this.handleScrollStart}
                onTouchEnd={this.handleScrollEnd}
                className={styles.dateBgView}
              >
                {/* 空日期展位符 */}
                {empytGrids.map(_item => {
                  return (
                    <View key={_item} className={styles.dateEmptyView}></View>
                  );
                })}

                {daysArr.map((item, index) => {
                  return (
                    <View
                      id={"tiger" + item.year + "" + item.month + "" + item.day}
                      key={index}
                      className={styles.dateView}
                      onClick={this.handleClickDay.bind(this, item)}
                    >
                      <View
                        className={this.checkClassName(
                          index,
                          currentDayInd,
                          item.year,
                          item.month
                        )}
                      >
                        {item.day}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // 节流
  throttle = (func, wait, options) => {
    let pre = 0;
    let timeout;
    let now = Date.now();

    /* leading为false 把当前时间赋给上次时间pre */
    if (!options.leading) pre = now;

    return function() {
      if (now - pre > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        func.apply(this, arguments);
        pre = now;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, wait - (now - pre));
      }
    };
    function later() {
      /* 如果leading为false 校正pre时间为0 */
      pre = options.leading === false ? 0 : Date.now();
      func.apply(this, arguments);
    }
  };

  checkClassName = (index, currentDayInd, year, month) => {
    const { scrollYear, scrollMonth } = this.state;
    if ((scrollYear === year, scrollMonth === month)) {
      return styles.datesView + " " + styles.scrollActiveMonth;
    } else {
      return styles.datesView;
    }
    // return index == currentDayInd
    //   ? styles.datesView + " " + styles.dateSelectView
    //   : styles.datesView;
  };
}

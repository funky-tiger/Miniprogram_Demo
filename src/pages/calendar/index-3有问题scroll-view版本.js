/* eslint-disable no-unused-vars */
/* eslint-disable import/first */
/* eslint-disable react/no-unused-state */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
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
      touchDownY: 0, // 手指按下的位置
      scrollViewHeight: 0, // scroll-view的高度
      currentScrollTop: 0, // 当前滚动距顶部的高度
      fistMonthDistance: 0, // 第一个月份与第二个月份的间隔
      CalendarViewHeight: 0, // 当前日历的总高度
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
      allMonthHeight: 0, // 所有月份总高度
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
    if (type === "init" || type === "scrollToUp") {
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

  onScroll(e) {
    const {
      timeRangeArr,
      allMonthHeight,
      monthHeight,
      MonthDistanceArr
    } = this.state;
    let scrollTop = e.detail.scrollTop;

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
  }

  checkHeight = arr => {
    // 获取每月1号元素距离顶部的高度
    const { timeRangeArr, currentYear, currentMonth } = this.state;
    let _arr = [];
    let _currentMonthScrollTop = 0;
    console.log("获取每月1号元素距离顶部的高度:", arr);
    for (let i = 0; i < timeRangeArr.length - 1; i++) {
      if (arr[i] && arr[i][0] && _arr.indexOf(arr[i][0].top) == -1) {
        // console.log("arr[i][0]", arr[i][0]);
        _arr.push(arr[i][0].top);
        // tiger201961
        // if ("tiger" + currentYear + "" + currentMonth + "1" === arr[i][0].id) {
        //   _currentMonthScrollTop = arr[i][0].top;
        // }
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
    console.log("1-获取滚动元素Dom相关-timeRangeArr", timeRangeArr);
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
            console.log("2-获取滚动元素Dom相关-rect", rect);

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
          allMonthHeight: view_height,
          monthHeight: Number(everyMonthHeight.toFixed(2)) + 5
        });
      })
      .exec();
  };

  handleScrollToUpper = () => {
    console.log("将要更新顶部了");
  };
  handleScrolltolower = e => {
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
        // timeRangeArr: [],
        // daysArr: []
      },
      () => {
        console.log("更新数据后;", this.state.timeRangeArr, this.state.daysArr);
      }
    );
    setTimeout(() => {
      this.checkDomInfo1(this.state.timeRangeArr.concat(_timeRangeArr));
    }, 1000);
    console.log(
      "将要更新底部了",
      timeRangeArr[timeRangeArr.length - 1],
      _timeRangeArr
    );
  };

  // 获取滚动元素Dom相关
  checkDomInfo1 = timeRangeArr => {
    console.log("1-获取滚动元素Dom相关-timeRangeArr", timeRangeArr);
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
            console.log("2-获取滚动元素Dom相关-rect", rect);

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
        _this.setState({
          allMonthHeight: view_height
        });
      })
      .exec();
  };

  checktest = arr => {
    const { timeRangeArr, fistMonthDistance } = this.state;
    let _arr = [];
    console.log("获取每月1号元素距离顶部的高度:", arr);
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
    console.log("handleScrollStart");
    let _this = this;
    let touchDownY = e.touches[0].clientY;
    this.setState({ touchDownY });
    // 获取 scrollview 的高度
    Taro.createSelectorQuery()
      .select("#scrollview")
      .boundingClientRect(function(rect) {
        _this.setState({ scrollViewHeight: rect.height });
      })
      .exec();

    // 获取 calendarView 的高度和当前的 scrollTop 位置
    Taro.createSelectorQuery()
      .select("#calendarView")
      .fields(
        {
          scrollOffset: true,
          size: true
        },
        function(rect) {
          _this.setState({ CalendarViewHeight: rect.height });
          _this.setState({ currentScrollTop: rect.scrollTop });
        }
      )
      .exec();
  };

  handleScrollEnd = e => {
    console.log("handleScrollEnd");
    let current_y = e.changedTouches[0].clientY;
    let _this = this;
    let { currentScrollTop, scrollViewHeight, touchDownY } = this.state;
    // console.log('current_y',current_y,'currentScrollTop',currentScrollTop,'scrollViewHeight',scrollViewHeight,'')
    if (
      current_y > touchDownY &&
      current_y - touchDownY > 20 &&
      currentScrollTop == 0
    ) {
      console.log("下拉刷新 的请求和逻辑处理等");
      // 下拉刷新 的请求和逻辑处理等
    } else if (
      current_y < touchDownY &&
      touchDownY - current_y >= 20 &&
      scrollViewHeight - 280 == currentScrollTop
    ) {
      console.log("上拉加载 的请求和逻辑处理等");
      // 上拉加载 的请求和逻辑处理等
    }
  };
  /**
   *
   */
  render() {
    const {
      scrollYear,
      scrollMonth,
      empytGrids,
      weeksChArr,
      daysArr,
      currentDayInd,
      timeRangeArr,
      allMonthHeight,
      monthHeight
    } = this.state;
    // console.log(
    //   "每月高度:",
    //   monthHeight,
    //   "所有高度:",
    //   allMonthHeight,
    //   "月份个数:",
    //   timeRangeArr.length
    // );
    const scrollStyle = {
      height: "280rpx"
    };
    const scrollTop =
      timeRangeArr.length % 2 === 0
        ? monthHeight * timeRangeArr.length
        : (monthHeight * (timeRangeArr.length - 1)) / 2 - 5;

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

            <ScrollView
              id='scrollview'
              scrollY
              scrollTop={scrollTop}
              style={scrollStyle}
              lowerThreshold={200} // 距顶部/左边多远时（单位 px），触发 scrolltoupper 事件
              upperThreshold={200} // 距底部/右边多远时（单位 px），触发 scrolltolower 事件
              onScrollToUpper={this.handleScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
              onScrolltolower={this.handleScrolltolower}
              onScroll={this.onScroll}
            >
              <View
                id='calendarView'
                // onTouchEnd={this.handleScrollEnd}
                // onTouchStart={this.handleScrollStart}
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
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

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

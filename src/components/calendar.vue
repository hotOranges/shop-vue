<template>
  <div class="date">
    <van-nav-bar title="我的积分" @click-left="onClickLeft" left-arrow>
      <van-icon
        name="question-o"
        style="font-size: 20px;"
        slot="right"
        @click="redirects('/integralRule')"
      />
    </van-nav-bar>
    <div class="title">
      <van-cell-group class="caltext"></van-cell-group>
      <van-cell-group class="caltextBorder"></van-cell-group>
      <van-cell-group class="caltext2">
        <span>
          <b>{{score}}</b>
          分
        </span>
        <span>累计签到{{daysNumber}}天</span>
      </van-cell-group>
    </div>
    <div class="title2">
      <div>
        <span class="span">
          <van-button
            round
            v-bind:class="{ classred:disabled}"
            class="initBtn"
            :disabled="disabled"
            @click="qd"
          >{{btntext}}</van-button>
        </span>
        <span class="span">
          <van-button round class="initBtn" @click="redirects('/integralDetil')">积分明细</van-button>
        </span>
      </div>
    </div>
    <div style="position:absolute;top:300px;width: 100%;">
      <ul class="weekdays days">
        <!-- <v-touch v-on:swipeleft="left" v-on:swiperight="right" class="wrapper"> -->
        <li v-for="(day, index) in days" :key="index" :class="menuListActive(day.time)">
          <span v-if="day.time.getMonth()+1 != currentMonth" class="other-month crl">+1</span>
          <span v-else>
            <span
              class="crl"
              v-if="day.time.getFullYear() == new Date().getFullYear() && day.time.getMonth() == new Date().getMonth() && day.time.getDate() == new Date().getDate()"
            >+1</span>
            <span class="crl" v-else>+1</span>
          </span>
        </li>
        <!-- </v-touch> -->
      </ul>
      <!-- 日期 -->
      <ul class="days">
        <li v-for="(day, index) in days" :key="index">
          <!--本月-->
          <span
            v-if="day.time.getMonth()+1 != currentMonth"
            class="other-month"
          >{{day.time.getMonth()+1}}.{{ day.time.getDate() }}</span>
          <span v-else>
            <!--今天-->
            <span
              v-if="day.time.getFullYear() == new Date().getFullYear() && day.time.getMonth() == new Date().getMonth() && day.time.getDate() == new Date().getDate()"
            >今天</span>
            <span v-else>{{day.time.getMonth()+1}}.{{ day.time.getDate() }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { integralIndex, signIn } from "../api/login";
export default {
  name: "date",
  data() {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      daysNumber: "",
      score: "",
      activeDay: [],
      days: [],
      disabled: false,
      btntext: ""
    };
  },

  mounted() {
    this.jugstat();
  },

  created() {
    this.initData(null);
  },

  methods: {
    jugstat() {
      let para = {
        token: JSON.parse(localStorage.getItem("token"))
      };
      integralIndex(para).then(res => {
        if (res) {
          this.daysNumber = res.signInCount;
          this.score = res.score;
          if (res.signInDate.length > 0) {
            for (let i = 0; i < res.signInDate.length; i++) {
              this.activeDay.push({
                time: res.signInDate[i]
              });
            }
          }
          this.btntext = "签到";
          if (res.isSignIn == 0) {
            this.btntext = "签到";
            this.disabled = false;
          } else {
            this.btntext = "已签到";
            this.disabled = true;
          }
        }
      });
    },
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },
    menuListActive: function(name) {
      var text = "sort";
      var yedata =
        new Date(name).getFullYear() +
        "." +
        (new Date(name).getMonth() + 1) +
        "." +
        new Date(name).getDate();
      var filters = this.activeDay.filter(item => {
        var datas =
          new Date(item.time).getFullYear() +
          "." +
          (new Date(item.time).getMonth() + 1) +
          "." +
          new Date(item.time).getDate();
        if (yedata && datas.indexOf(yedata) === -1) return false;
        return true;
      });
      if (filters.length > 0) {
        text = "active";
      } else {
        text = "sort";
      }

      return text;
    },
    left() {
      this.weekNext();
    },
    right() {
      this.weekPre();
    },
    qd() {
      let para = {
        token: JSON.parse(localStorage.getItem("token"))
      };
      signIn(para).then(res => {
        var datas = new Date();
        this.activeDay.push({
          time: datas
        });
        this.btntext = "已签到";
        this.disabled = true;
        this.jugstat();
      });
    },
    initData(cur) {
      let date = "";
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate(); // 今日日期 几号
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 1...6,0  // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.days.length = 0;
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        this.days.push({
          time: d,
          state: false
        });
        // console.log(this.days)
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push({
          time: d,
          state: false
        });
      }
    },

    weekPre() {
      const d = this.days[0].time;
      d.setDate(d.getDate() - 7);
      this.initData(d);
    },

    weekNext() {
      const d = this.days[6].time;
      d.setDate(d.getDate() + 7);
      this.initData(d);
    },

    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 下一個月  传入当前年份和月份
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 当前选择日期
    pick(date) {
      alert(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    },
    redirects(url) {
      this.$router.push(url);
    },
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
.data .van-hairline--top-bottom::after {
  border-width: 0px 0px;
}
.date .van-nav-bar__title{
  color: #fff
}
.date {
  height: px2rem(180);
  color: #333;
  background-color: #ef9e3e;
}
.date .van-hairline--bottom::after {
  border-bottom-width: 0px;
  border-color: #ef9e3e;
}
.date .wrapper {
  width: 100%;
}
.date .title2 {
  height: 50px;
  background: linear-gradient(48deg, #ef9e3e 0%, #e4a042 100%);
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}
.date .title2 .span {
  display: inline-block;
  width: 49%;
  text-align: center;
}
.date .title2 .initBtn {
  background-color: transparent;
  border: 1px solid white;
  color: #fff;
  height: 32px;
  line-height: 30px;
  border-radius: 18px 18px 18px 18px;
  width: 100px;
}
.date .title2 .initBtn .van-button__text {
  color: #fff;
}
.date .title2 .classred {
  background: white;
}
.date >>> .title2 .classred .van-button__text {
  color: #333
}
.date .title2 .classred .van-button__text {
  color: #ed9f3f;
}
.date .title2 .van-cell-group {
  background-color: transparent;
}
.date .title {
  height: 180px;
  background: linear-gradient(48deg, #ef9e3e 0%, #e4a042 100%);
  position: relative;
  text-align: center;
}
.date .title .caltext {
  width: 123px;
  height: 123px;
  background: #f7d4aa;
  border-radius: 123px;
  opacity: 0.2402;
  position: absolute;
  left: 50%;
  margin-left: -64px;
  top: 50%;
  margin-top: -62px;
  text-align: center;
}
.date .title .van-hairline--top-bottom::after {
  border-width: 0px 0;
}
.date .title .caltextBorder {
  width: 145px;
  height: 145px;
  position: absolute;
  border: 1px solid white;
  background-color: transparent;
  opacity: 0.2402;
  border-radius: 145px;
  left: 50%;
  margin-left: -75px;
  top: 50%;
  margin-top: -74px;
}
.date .title .caltext2 {
  position: absolute;
  background-color: transparent;
  left: 50%;
  top: 50%;
  margin-top: -40px;
  margin-left: -55px;
  width: 110px;
  height: 65px;
  text-align: center;
}
.date .title .caltext2 span {
  display: inline-block;
  color: #fff;
  background-color: transparent;
  width: 100%;
  text-align: center;
  font-size: 12px;
}
.date .title .caltext2 span b {
  font-size: 35px;
  font-weight: 100;
}
.date .title .calbtn {
  width: 100%;
  position: absolute;
  bottom: 15px;
  background-color: transparent;
}
.date .van-nav-bar {
  background: linear-gradient(48deg, #ef9e3e 0%, #e4a042 100%);
  line-height: 60px;
  height: 48px;
  color: #fff;
}
.date >>> .van-nav-bar .van-icon{
  color: #fff
}
.date .van-nav-bar .van-icon {
  color: #fff;
}
.date .van-nav-bar .van-ellipsis.van-nav-bar__title {
  color: #fff;
  line-height: 43px;
}
.date span {
  color: #6b6b6b;
  font-size: 13px;
}
.date .month {
  font-size: px2rem(24);
  text-align: center;
  margin-top: px2rem(20);
}
.date .weekdays {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: px2rem(28);
  margin-top: px2rem(20);
  position: relative;
}
.date .weekdays .active {
  background-color: #3fd0ed;
  border-color: #3fd0ed;
  width: 10%;
}
.date .weekdays .active .crl {
  color: #fff;
}
.date .weekdays .sort {
  width: 14.333%;
}
.date .weekdays li {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  border: 1px solid #d8d8d8;
  color: #d8d8d8;
  border-radius: 50%;
  height: 35px;
  line-height: 35px;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 10px;
}
@media screen and (min-width: 375px) { 
.date .weekdays li {
   height: 39px;
  line-height: 39px;
}
} 
.date .weekdays span {
  color: #d8d8d8;
  line-height: 1.6;
}
.date .weekdays .crl::before {
  content: " ";
  position: absolute;
  pointer-events: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 6px;
  height: 6px;
  background: #e4e4e4;
  text-align: center;
  bottom: 1px;
  margin-left: 4px;
  border-radius: 6px;
  z-index: 222;
}
.date .weekdays li:after {
  content: " ";
  position: absolute;
  pointer-events: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  left: 24px;
  right: 24px;
  bottom: 3px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  border-bottom: 1px solid gba(255, 255, 255, 1);
}
.date .days {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  float: left;
  width: 100%;
}
.date .days li {
  font-size: px2rem(30);
  text-align: center;
  margin-top: px2rem(10);
  line-height: px2rem(60);
  display: inline-block;
  width: 15%;
}
.date .days li .active {
  display: inline-block;
  width: px2rem(60);
  height: px2rem(60);
  color: #fff;
  border-radius: 50%;
  background-color: #fa6854;
}
.date .days li .other-month {
  color: #e4393c;
}
.van-hairline--top-bottom::after {
  border-width: 0px 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
</style>


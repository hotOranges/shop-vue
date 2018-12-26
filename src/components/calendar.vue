<template>
  <div class="date">
    <van-nav-bar title="我的积分" @click-left="onClickLeft" left-arrow>
      <van-icon name="question" slot="right" @click="redirects('/editme')"/>
    </van-nav-bar>
    <van-col span="24" class="title">
      <van-cell-group class="caltext"></van-cell-group>
      <van-cell-group class="caltextBorder"></van-cell-group>
      <van-cell-group class="caltext2">
        <span>
          <b>2000</b>
          分
        </span>
        <span>累计签到100天</span>
      </van-cell-group>
    </van-col>
    <van-col class="title2" span="24">
      <van-cell-group>
        <span class="span"><van-button round class="initBtn active">{{btntext}}</van-button></span>
        <span class="span"><van-button round class="initBtn">积分明细</van-button></span>
      </van-cell-group>
    </van-col>
   
    <ul class="weekdays days">
      <v-touch v-on:swipeleft="left" v-on:swiperight="right" class="wrapper">
      <li  v-for="(day, index) in days" :key="index" class="active">
        <span v-if="day.time.getMonth()+1 != currentMonth" class="other-month crl">+1</span>
        <span v-else>
          <span
            class="crl"
            v-if="day.time.getFullYear() == new Date().getFullYear() && day.time.getMonth() == new Date().getMonth() && day.time.getDate() == new Date().getDate()"
          >+1</span>
          <span class="crl" v-else>+1</span>
        </span>
      </li>
          </v-touch>
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
</template>
<script>
export default {
  name: "date",
  data() {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      btntext:''
    };
  },

  mounted() {
    this.btntext = '签到'
  },

  created() {
    this.initData(null);
  },

  methods: {
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },
    left(){
      this.weekNext()
    },
    right(){
      this.weekPre()
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
          time:d,
          state:false
        });
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
         this.days.push({
          time:d,
          state:false
        })
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
    onClickLeft() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
.date {
  height: px2rem(180);
  color: #333;
  .van-hairline--bottom::after {
    border-bottom-width: 0px;
    border-color: linear-gradient(48deg, #ef9e3e 0%, #e4a042 100%);
  }
  .wrapper{
 width: 100%
  }
  .title2{
    height: 50px;
    background: linear-gradient(48deg, #ef9e3e 0%, #e4a042 100%);
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    .span{
      display: inline-block;
      width: 49%;
      text-align: center;
    }
    .initBtn{
      background-color: transparent;
      border:1px solid rgba(255,255,255,1);
      color: #fff;
      height: 32px;
      line-height: 30px;
      border-radius: 18px 18px 18px 18px;
      width: 100px;
      .van-button__text{
        color: #fff
      }
    }
    .van-cell-group{
      background-color: transparent;
    }
     .van-hairline--top-bottom::after{
            border-width:0px 0px;
      }
  }
  .title {
    height: 180px;
    background: linear-gradient(48deg, #ef9e3e 0%, #e4a042 100%);
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    position: relative;
    .caltext {
      width: 123px;
      height: 123px;
      background: rgba(247, 212, 170, 1);
      border-radius: 123px;
      opacity: 0.2402;
      position: relative;
    }
    .van-hairline--top-bottom::after{
      border-width: 0px 0;
    }
    .caltextBorder{
      width: 145px;
      height: 145px;
      position: absolute;
      border:1px solid rgba(255,255,255,1);
      background-color: transparent;
      opacity:0.2402;
      border-radius: 145px;
    }
    .caltext2 {
      position: absolute;
      background-color: transparent;
      span {
        display: inline-block;
        color: #fff;
        background-color: transparent;
        width: 100%;
        text-align: center;
        font-size: 12px;
        b{
        font-size: 35px;
        font-weight: 100;
        }
      }
    }
    
    .calbtn{
      width: 100%;
      position:absolute;
      bottom: 15px;
      background-color: transparent ;
      
    }
  }
  .van-nav-bar {
    background: linear-gradient(
      48deg,
      rgba(239, 158, 62, 1) 0%,
      rgba(228, 160, 66, 1) 100%
    );
    line-height: 60px;

        height: 48px;
    .van-icon {
      color: #fff;
    }
    .van-ellipsis.van-nav-bar__title {
      color: #fff;
      line-height: 43px;
    }
  }
  span {
    color: rgba(107, 107, 107, 1);
    font-size: 13px;
  }
  .month {
    font-size: px2rem(24);
    text-align: center;
    margin-top: px2rem(20);
  }

  .weekdays {
    display: flex;
    font-size: px2rem(28);
    margin-top: px2rem(20);
    position: relative;
    .active {
      background-color: rgba(63, 208, 237, 1);
      border-color: rgba(63, 208, 237, 1);
      width: 10%;
      .crl {
        color: #fff;
      }
    }
    li {
      flex: 1;
      text-align: center;
      border: 1px solid #d8d8d8;
      color: #d8d8d8;
      border-radius: 30px 30px 30px 30px;
      line-height: 35px;
      margin-left: 7px;
      margin-right: 7px;
      margin-bottom: 10px;
    }
    span {
      color: #d8d8d8;
    }
    .crl::before {
      content: " ";
      position: absolute;
      pointer-events: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 6px;
      height: 6px;
      background: rgba(228, 228, 228, 1);
      text-align: center;
      bottom: 1px;
      margin-left: 4px;
      border-radius: 6px;
      z-index: 222;
    }
    li:after {
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
  }

  .days {
    display: flex;
    float: left;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch; /*解决在ios滑动不顺畅问题*/
     overflow-y: hidden;
    li {
      font-size: px2rem(30);
      text-align: center;
      margin-top: px2rem(10);
      line-height: px2rem(60);
      display: inline-block;
      width: 15%;
      .active {
        display: inline-block;
        width: px2rem(60);
        height: px2rem(60);
        color: #fff;
        border-radius: 50%;
        background-color: #fa6854;
      }

      .other-month {
        color: #e4393c;
      }
    }
  }
}
</style>
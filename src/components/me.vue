<template>
   <!-- 我的 组件 -->
  <div id="app">
  <van-nav-bar title="" @click-left="onClickLeft" left-arrow>
  <van-icon name="discount" slot="right" />
</van-nav-bar>
  <van-row class="col-me" style="background: rgba(242,242,242,1);">            
                    <van-col span='24' class="title">
                         <van-col span='6' offset="1" class="imgList">
                          <img src="../../static/images/icon/icon_9.png" name="adapter" />
                        </van-col>
                        <van-col span='9' offset="1" class="goodList">
                          <span>init</span>
               
                        </van-col>
                        <van-col span='6' offset="1" class="goodIntegral">
                          <span style="font-size: 12px;"><van-icon name="points" />积分12</span>
                        </van-col>
                     </van-col>
                     <!-- 订单 -->
                     <van-col span="24" class="headerImg">
                      <van-cell @click="toOrder('0')" style="padding-bottom: 15px;" title="我的订单" value="查看全部订单" icon="location" is-link />
                     <van-col span='4' offset="1">
                     <div @click="toOrder('1')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>待付款</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="1">
                     <div @click="toOrder('2')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>待收货</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="1"  @click="toOrder('3')">
                     <div @click="toOrder('3')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>已收货</span>
                     </div>
                     </van-col>
                     <van-col span='5' offset="1"  @click="toOrder('4')">
                     <div @click="toOrder('4')">
                     <span><img src="../../static/images/icon/icon_9.png"  /></span>  
                     <span>已取消</span>
                     </div>
                     </van-col>
                     </van-col>
                      
                      <!-- 列表区 -->
                      <van-col span="24" class="headerList">
                      <van-cell style="padding-bottom: 15px;" title="我的收藏"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="我的优惠劵"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="收货地址"  @click="redirects('/address')" icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="帮助与反馈"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="客服中心"  icon="location" is-link />
                      <van-cell style="padding-bottom: 15px;" title="关于"  icon="location" is-link />
                     </van-col>
 
       </van-row>

   
    <!-- tabBar -->
   

    </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { Dialog } from "vant";

export default {
  name: "Me",
  components: {},
  data() {
    return {
      tabarActive: 3,
      img:
        "http://img3.duitang.com/uploads/item/201511/14/20151114125146_LXHzE.jpeg",
      menu: ["我的信用评分", "物流信息", "联系人管理", "密码设置"],
      currentRate: 0,
      login: ["立即登录"],
      checked: true,
      shows: false,
      xinyong: false,
      wuliu: false,
      contact: false,
      pass: false,
      value: 5,
      active: 3,
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [
        {
          name: "张三",
          tel: "13000000000",
          id: 0
        }
      ],
      value: "",
      showKeyboard: true
    };
  },
  computed: {
    ...mapState({
      src: state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show
    }),
    ...mapGetters(["bc_notshow", "search_show"]),
    text() {
      return this.currentRate.toFixed(0) + "分";
    },
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },
  methods: {
    ...mapActions(["searchA", "infoAction"]),
    redirects(url) {
      this.$router.push(url);
    },
    onClickLeft() {
      this.$router.push("/");
    },
    toOrder(e) {
      console.log(e);
      this.$router.push({ path: "/orderForm", query: { activeId: e } });
    },
    onInput(checked) {
      if (this.checked) {
        Dialog.confirm({
          title: "提醒",
          message: "关闭安全模式可能给您带来风险，是否确认关闭"
        }).then(() => {
          this.checked = checked;
        });
      } else {
        Toast("正在为您护驾~~");
        this.checked = true;
      }
    },
    listCover(v) {
      this.shows = true;

      switch (v) {
        case "我的信用评分":
          this.wuliu = false;
          this.contact = false;
          this.pass = false;
          this.xinyong = true;
          break;
        case "物流信息":
          this.contact = false;
          this.pass = false;
          this.xinyong = false;
          this.wuliu = true;
          break;
        case "联系人管理":
          this.pass = false;
          this.xinyong = false;
          this.wuliu = false;
          this.contact = true;
          break;
        case "密码设置":
          this.xinyong = false;
          this.wuliu = false;
          this.contact = false;
          this.pass = true;
          break;
        default:
          this.shows = false;
          break;
      }
    },
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;

      if (this.isEdit) {
        this.list = this.list.map(item => (item.id === info.id ? info : item));
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    onInputs(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.split("").length >= 6) {
        Toast("密码设置成功 ^_^");
        this.shows = false;
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onRead(file) {
      console.log(file);
      this.img = file.content;
      Toast("头像上传成功 ^_^");
    }
  },
  watch: {},
  directives: {
    //tabBar 消息通知指令
    infos: {
      inserted(el, obj) {
        console.log(obj.value);
        const info = el.childNodes[0].childNodes[1];
        info.innerText = obj.value;
      }
    }
  },
  beforeCreate() {
    this.axios.get("./static/data.json").then(
      res => {
        if (res.status == 200) {
          const data = res.data.goods;
        } else {
          this.imageList = this.src;
          this.broadcast = "暂无消息~~QAQ~";
        }
      },
      err => {
        this.imageList = this.src;
        this.broadcast = "暂无消息~~QAQ~";
      }
    );
  },
  created() {
    Toast("预估完成  ^_^");
    setTimeout(function() {
      Toast("今日表现不错 ^_^ ");
    }, 1500);
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
<style scoped>
#app >>> .van-nav-bar {
  background: linear-gradient(
    48deg,
    rgba(239, 158, 62, 1) 0%,
    rgba(228, 160, 66, 1) 100%
  );
}
#app >>> .van-nav-bar .van-icon {
  color: #fff;
}
#app >>> .van-icon-discount::before {
  font-size: 22px;
}
#app >>> .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
#app >>> .van-cell__title {
  text-align: left;
  font-size: 15px;
  color: #323232;
}
#app >>> .van-cell__value {
  font-size: 12px;
}
</style>

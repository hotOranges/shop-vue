<template>
  <div id="apps">
      <van-nav-bar
  class="init-header"
  title="退换/售后"
  left-arrow
  @click-left="onClickLeft"
>
</van-nav-bar>

 <div class="init-list" v-for="i in fromData">
  <van-cell-group>
  <van-cell :title="i.applyTime" :value="typeText(i.saleType)" />
  </van-cell-group>
  <div class="init-soller-list2">
  <van-col span='5' offset="2" class="imgList">
     <img  :src="'http://'+'106.15.44.76/image/'+i.productImage" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
      <span>{{i.productName}}</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;">X{{i.productNum}}</span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
  <div span='4' offset="1" class="btn">
      <button @click="detial(i.id)">查看详情</button>
  </div>
 
  </van-cell-group>
  
  <div class="init-clear"></div>
  
  </div>
  <div class="init-border-20"></div>
  <h5 v-if="fromData.length>0 && shows && fromData.length>=(page+1)*5" @click="more" class="more"><van-icon name="add-o" /><i class="text">点击加载更多</i></h5>
  </div>
</template>

<script>
import {listSale} from '../api/login'
import { Toast } from "vant";
export default {
  data() {
    return {
      page:0,
      show: false,
      shows:true,
      fromData:{}
    };
  },

  components: {},

  computed: {},
  mounted () {
    this.inits()
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    typeText(i){
      var text;
      if (i=='1') {
        text = '退货'
      }else if (i=='2') {
        text = '换货'
      }else{
        text = '维修'
      }
      return text
    },
    inits(){
      let para = {
              token:JSON.parse(localStorage.getItem('token')),
              currentPage:this.page,
              pageSize:5
            }
            listSale(para).then(res=>{
              this.fromData = res ? res:'';
            })
    },
    more(){
      ++this.page
     let para = {
          token:JSON.parse(localStorage.getItem('token')),
          currentPage:this.page,
          pageSize:5
      }
      listSale(para).then(res=>{
        if (res.length>0) {
          for (var i in res) {
          this.fromData.push(res[i])
          }
        }else{
          this.shows =false
        }

      })
    },
    detial(id) {
      this.$router.push({ path: '/aftersalesDetil', query: { saleId: id }});
    }
  }
};
</script>
<style scoped>
#apps >>> .van-cell__title,
.van-cell__value {
  text-align: left;
}
#apps >>> .imgList img {
  width: 100%;
}

#apps >>> .init-soller-list2 {
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#apps >>> .van-col--offset-1 {
  display: inline-table;
  vertical-align: top;
  float: inherit;
}
/*掩藏滚动条*/
::-webkit-scrollbar {
  display: none !important;
}
#apps .btn {
  float: right;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
  padding-bottom: 10px;
}
#apps .btn button {
  font-weight: 500;
  color: rgba(179, 144, 97, 1);
  background-color: transparent;
  border: 1px solid #b39061;
  line-height: 31px;
  border-radius: 3px;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
#apps >>> .van-col--4 {
  text-align: right;
  padding-right: 11px;
  line-height: 28px;
}
#apps >>> .van-hairline--top-bottom::after {
  border-color: #d8d8d8;
}
#apps >>> .init-border ::before {
  border-bottom: 1px solid #d8d8d8;
}
#apps >>> #init-border::after {
  transform: scale(0.3);
}
#apps >>> .init-clear {
  clear: both;
}
#apps >>> .init-border-20 {
  background: rgba(242, 242, 242, 1);
  height: 20px;
  position: relative;
  width: 100%;
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
#apps >>> .more{
  text-align: center;
  line-height: 30px;
  position: relative;
}
#apps >>> .more .text{
  font-style: unset;
  padding-left: 21px;
}
#apps >>> .more .van-icon.van-icon-add-o{
  font-size: 15px;
  margin-right: 2px;
  /* margin-top: 0px; */
  /* line-height: 28px; */
  position: absolute;
  top: 6px;
  padding-right: 24px;
}
</style>
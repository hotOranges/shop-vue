<!--  -->
<template>
  <div id="apps">
           <van-nav-bar
  class="init-header"
  title="评价晒单"
  left-arrow
  @click-left="onClickLeft"
 />
 <div v-for="(item, index) in formdata" :key="index">
    <div class="init-soller-list2">
  <van-col span='7' offset="2" class="imgList">
      <img :src="imgsevers +'/image/'+item.productImage" name="adapter" />
  </van-col>
   <van-col span='11' offset="2" class="imgList">
        <span>{{item.productName}}</span>
        <span>数量：{{item.productNum}} 规格：{{item.productColor}}</span>
        <span>￥{{item.paymentAmount}}</span>
  </van-col>
  <van-col span='4' offset="2" class="imgList">
      <span style="font-size: 11px;"></span>
  </van-col>
  </div>
  <van-cell-group id="init-border">
  <div span='4' offset="1" class="btn">
      <button @click="Evaluations(item)">评价晒单</button>
  </div>
  </van-cell-group>
  <div class="init-clear"></div>
   <div class="init-border-20"></div>
   </div>
  </div>
</template>

<script>
import {reviews,severs,imgsevers} from '../api/login'
import { Toast } from "vant";
export default {
  data () {
    return {
        orderNo:'',
        severs:severs(),
        imgsevers:imgsevers(),
        formdata:''
    };
  },

  components: {},

  computed: {},

  mounted() {
      this.orderNo =  this.$route.query.orderNo;
      this.inits()
  },

  methods: {
    inits(){

       let para = {
        orderNo:this.orderNo,
        token:JSON.parse(localStorage.getItem('token'))
      }
      reviews(para).then(res =>{
       if (res) {
         this.formdata = res
        }
      })  

    },
     onClickLeft() {
      this.$router.back(-1);
    },
    Evaluations(i){
        if (i.isReview=='0') {
            localStorage.setItem('Evaluationdetial_s', JSON.stringify(i))
            this.$router.push({ path: '/Evaluation', query: { orderNo: this.orderNo }});
        }else{
            Toast('您已经评论过了~')
        }
       
    },
     redirects(url) {
      this.$router.push(url);
    },
  }
}

</script>
<style scoped>
#apps >>> .imgList img {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}

#apps >>> .init-soller-list2 {
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  height: 150px;

}
#apps >>> .van-col--offset-2 span {
  font-size: 13px;
  display: inline-block;
  padding-bottom: 5px;
}
#apps >>> #init-border .van-cell__value--alone {
  text-align: right;
  padding-right: 15px;
}
#apps .btn {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: -20px;
    padding-bottom: 10px;
    text-align: right;
} 
#apps .van-hairline--top-bottom::after {
    border-width: 0px 0;
    -webkit-transform: scale(0);
   
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
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
</style>

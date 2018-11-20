<!--  -->
<template>
  <div id="app">
      <van-nav-bar title="晒单评论" right-text="提交"  @click-left="onClickLeft" left-arrow>
      </van-nav-bar>
    <van-row class="shopp_conent">
      <van-col span='6' offset="1" class="imgList">
      <img   src="https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg" name="adapter" />
    </van-col>
    <van-col span='15' offset="1">
      <span>商品评分</span>
          <van-rate
      v-model="value"
      :size="20"
      :count="5"
      color="#B39061"
      void-color="#B39061"
    />

    </van-col> 
    </van-row>  
    <van-row>
      <van-cell-group>
  <van-field
    v-model="message"
    :autosize="textareaH"
    type="textarea"
    placeholder="请输入留言"
    rows="1"
  />
</van-cell-group>
<van-checkbox v-model="checked" checked-color="#CF3939">匿名评论</van-checkbox> 
</van-row>
<van-row>
<van-cell-group>
  <van-cell title="物流服务评分" value="" />
</van-cell-group>
</van-row>
 <van-row class="shopp_conent">
 <van-col span='6' offset="1" class="">
     快递包装
 </van-col>
<van-col span='15' offset="1">
          <van-rate
      v-model="value"
      :size="20"
      :count="5"
      color="#B39061"
      void-color="#B39061"
    />

    </van-col>
 </van-row>
 <van-row class="shopp_conent">
 <van-col span='6' offset="1" class="">
     送货速度
 </van-col>
<van-col span='15' offset="1">
          <van-rate
      v-model="value"
      :size="20"
      :count="5"
      color="#B39061"
      void-color="#B39061"
    />

    </van-col>
 </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    value:3,
    textareaH:{ maxHeight: 150, minHeight: 60 },
    checked:true
    };
  },


//   mounted: {
    
//   },

  methods: {
      onClickLeft(){
        this.$router.back(-1);
    }
  }
}

</script>
<style scoped>
#app >>> .imgList img {
  width: 100%;
  height: 100%;
}
#app >>> .shopp_conent {
  height: 100%;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
}
#app >>> .van-col.van-col--15.van-col--offset-1{
  text-align: left
}
#app >>> .van-rate{
  margin-top: 7px;
}
#app >>> .van-cell-group.van-hairline--top-bottom .van-cell.van-field{
  background-color: rgba(242,242,242,1)
}
#app >>> .van-cell{
  background-color: #fff
}
#app >>> textarea{
  color: #D8D8D8;
  font-size: 12px
}
#app >>> .van-checkbox{
    text-align: left;
    padding-left: 15px;
    padding-top: 15px;
}
#app >>> .van-checkbox__label{
      font-size: 12px;
}
#app >>> .van-cell__title{
  text-align: left;
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 0px;
  padding-left: 10px;
}
#app >>> .van-col.van-col--6.van-col--offset-1{
  font-size: 15px;
  text-align: left;
}
#app >>> .van-nav-bar__text{
  color: red
}
#app >>> .van-nav-bar .van-icon{
  color: #2c3e50
}
</style>
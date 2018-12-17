<template>
  <div id="apps">
        <van-nav-bar
  class="init-header"
  title="称呼"
  right-text="保存"
  @click-right="onClickRight"
  left-arrow
  @click-left="onClickLeft"
>
</van-nav-bar>
 <van-cell-group>
<van-cell-group>
  <van-field v-model="nickName" placeholder="请输入用户名"  clearable/>
</van-cell-group>
</van-cell-group>
  </div>

</template>

<script>
import {editUser} from '../api/login'
import { Field } from 'vant';
import {Toast} from 'vant'
import { login } from "../../src/api/login";
export default {
  data() {
    return {
    nickName:'',
    fileName:'',
    };
  },
  mounted () {
    this.nickName =  this.$route.query.nickName;
    this.fileName =  this.$route.query.fileName; 
  },
  methods: {
   onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight(){
      let para ={
          token:JSON.parse(localStorage.getItem('token')),
          nickName:this.nickName,
          fileName:this.fileName
      }
      if (this.nickName.length>6) {
        Toast('长度不能大于6')
        return
      }
       editUser(para).then(res =>{
         this.onClickLeft()
      })

     
    },
    onSelectchange(){
        this.show = !this.show
    },
     onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    }
  },
};
</script>

<style lang="less" scoped>
</style>
<style scoped>
.initsimg{
    border-radius: 50%;
    width: 50px;
    height: 50px;
    float: right;
}
#apps >>> .van-cell{
line-height: 50px
}
#apps >>> .van-cell__right-icon{
    line-height: 50px;
}
#apps >>> .van-actionsheet__cancel, .van-actionsheet__item{
color: red;
}
#apps >>> .van-actionsheet{
    width: 92%;
    margin-left: 4%;
    margin-bottom: 3%
}
#apps >>> .van-nav-bar__text{
    color: red
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
#apps >>> .van-icon.van-icon-clear{
  right: 5px;
  width: 30px;
}
</style>


<template>
  <div id="apps">
        <van-nav-bar
  class="init-header"
  title="编辑资料"
  left-arrow
  @click-left="onClickLeft"
>
</van-nav-bar>
 <van-cell-group>
  <van-cell is-link @click="onSelectchange" >
      <span>头像</span>
<img :src="form.avatar" name="adapter"  class="initsimg"/>
  </van-cell>
  <van-cell is-link  @click="goEditName">
      <span>昵称</span>
      <span style="float: right;">{{form.nickName}}</span>
  </van-cell>
</van-cell-group>

<van-actionsheet 
  v-model="show"
  @select="onSelect"
>
<p calss="pinit">
<van-uploader :after-read="onRead">
  相册
</van-uploader>
</p>
<p calss="pinit" style="text-align: center;border-top: 1px solid #999">
<van-uploader :after-read="onRead" accept="image/*" capture="camera">
  拍照
</van-uploader></p>
<p style="background-color:rgba(0,0,0,.7);height: 14px;"></p>
<p @click="onSelectchange" calss="pinit" style="text-align: center;color: red;">取消</p>
</van-actionsheet>
  </div>

</template>

<script>
import {getUser,editUser} from '../api/login'
import { Actionsheet } from 'vant';
import { Uploader } from 'vant';
import {Toast} from 'vant'
import { login } from "../../src/api/login";
export default {
  name: "login",
  components: {},
  data() {
    return {
       show: false,
       url:'',
       form:{
        nickName:'未设置',
        avatar:'http://106.15.44.76:60180/smartphone-web/static/img/img.739c4ef.jpg'
      },
      actions: [
        {
          name: '拍照'
        },
        {
          name: '本地相册',
        } 
      ]
    };
  },
  computed: {
  },
   mounted(){
    this.inits()
  },
  methods: {
   onClickLeft() {
      this.$router.back(-1);
    },
    onSelectchange(){
        this.show = !this.show
    },
    inits(){
      let para = {
        token:JSON.parse(localStorage.getItem('token'))
      }
      getUser(para).then(res =>{
        if (res) {
          if (res.nickName.length>0) {
            this.form.nickName = res.nickName
          }
          if (res.avatar.length>0) {
            this.form.avatar = res.avatar
          }
        }

        this.show = false
      })
    },
    onRead(file) {
        let thiss =this
      var formData = new FormData();
       
        formData.append("file", file.file);
        formData.append("token", JSON.parse(localStorage.getItem('token')));        
        // HTML 文件类型input，由用户选择
        var request = new XMLHttpRequest();
        request.open("POST", "http://106.15.44.76/iwings-manager/customerUser/upload");
        request.send(formData);
        request.onreadystatechange = function() {
               var DONE = 4; // readyState 4 代表已向服务器发送请求
                var OK = 200; // status 200 代表服务器返回成功
                if(request.readyState === DONE){
                    if(request.status === OK){
                      thiss.url = JSON.parse(request.responseText).data
                      thiss.changeUser()
                    } else{
                        console.log("Error: "+ request.status); // 在此次请求中发生的错误
                    }
                }
            }
    },
    changeUser(){

        let para = {
        token:JSON.parse(localStorage.getItem('token')),
        fileName:this.url,
        nickName:this.form.nickName
      }
      editUser(para).then(res =>{
        this.inits()
       
      })
    },
    goEditName(){
      this.$router.push({ path:'/editname',query:{ nickName:this.form.nickName,fileName:this.form.avatar}})  
    },
     onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {}
};
</script>

<style lang="less" scoped>
@import url("../assets/css/login.less");
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
    margin-bottom: 12px;
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
.pinit{
  width: 100%;
  padding:0;
  margin:0
}
#apps >>> .van-uploader{
  width: 100%;
  text-align: center;
      line-height: 35px;
}
#apps >>> p{
  margin:0;
  line-height: 50px;
}
</style>


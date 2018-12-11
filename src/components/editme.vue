<template>
  <div id="apps">
    <van-nav-bar class="init-header" title="编辑资料" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link @click="onSelectchange">
        <span>头像</span>
        <img :src="form.avatar" name="adapter" class="initsimg">
      </van-cell>
      <van-cell is-link @click="goEditName">
        <span>昵称</span>
        <span style="float: right;">{{form.nickName}}</span>
      </van-cell>
    </van-cell-group>

    <van-actionsheet v-model="show" @select="onSelect">
      <p calss="pinit">
        <van-uploader :after-read="onRead" capture="image" accept="image/*" multiple>拍照</van-uploader>
      </p>
      <p calss="pinit" style="text-align: center;border-top: 1px solid #999">
        <van-uploader :after-read="onRead" multiple accept="image/*">本地相册</van-uploader>
      </p>
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
import axios from 'axios'
var instance = axios.create({
  headers: {'Content-Type': 'multipart/form-data'}
});
export default {
  name: "login",
  components: {},
  data() {
    return {
       show: false,
       url:'',
       form:{
        nickName:'',
        avatar:''
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
          }else{
             this.form.nickName = res.userName
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
         Toast.loading({
                duration: 0,
                mask: true,
                forbidClick: false,
                message: '上传中...' 
          });
          let img = new Image();
             img.src = file.content;
              let that=this;
             img.onload=function(){
                    that.ontpys(img);
            }
    },
       //压缩图片的方法
        ontpys(img){
            let originWidth = img.width, // 压缩后的宽
            originHeight=img.height,
            maxWidth = 400, maxHeight = 400,
            quality = 0.8, // 压缩质量
            canvas = document.createElement('canvas'),
            drawer = canvas.getContext("2d");
            canvas.width = maxWidth;
            canvas.height = originHeight/originWidth*maxWidth;
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            let file = this.dataURLtoFile(base64,Date.parse(Date())+'.jpg');
            file={content:base64,file:file};
            // console.log(file);//压缩后的file
            this.onimg(file);
        },
        //base64转file
        dataURLtoFile(dataurl,filename){
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr],filename,{type:mime});
        },
        onimg(file){
            //console.log(file.content)
            var formData = new FormData();
            formData.append("file", file.file);
            formData.append("token", JSON.parse(localStorage.getItem('token')));         
             instance({
                url:'http://pay.iwingscom.com/iwings-manager/customerUser/upload',
                method:'post',
                headers: {
                    'token': sessionStorage.token
                },
                data:formData
            })
            .then(response=>{
                this.url=response.data.data;
                this.changeUser()
            })
            .catch(error=>{
                console.log(error)
                 Toast.clear();
            })
        },
    changeUser(){
        let para = {
        token:JSON.parse(localStorage.getItem('token')),
        fileName:this.url,
        nickName:this.form.nickName
      }
      editUser(para).then(res =>{
        this.inits()
        Toast.clear();
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
</style>
<style scoped>
.initsimg {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  float: right;
}
#apps >>> .van-cell {
  line-height: 50px;
}
#apps >>> .van-cell__right-icon {
  line-height: 50px;
}
#apps >>> .van-actionsheet__cancel,
.van-actionsheet__item {
  color: red;
}
#apps >>> .van-actionsheet {
  width: 92%;
  margin-left: 4%;
  margin-bottom: 12px;
}
#apps >>> .van-nav-bar .van-icon {
  color: #2c3e50;
}
.pinit {
  width: 100%;
  padding: 0;
  margin: 0;
}
#apps >>> .van-uploader {
  width: 100%;
  text-align: center;
  line-height: 35px;
}
#apps >>> p {
  margin: 0;
  line-height: 50px;
}
</style>


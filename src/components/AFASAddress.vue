<template>
  <div id="apps">
         <van-nav-bar
  class="init-header"
  title="编辑地址"
  left-text=""
  right-text=""
  left-arrow
  @click-left="onClickLeft"
/>
 <van-address-edit
        :area-list="areaList"
        :show-postal="false"
        :show-set-default="false"
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        :show-delete="deletes"
        :address-info="addressInfo"
        @change-detail="onChangeDetail"
      />
  </div>
</template>

<script>
import { Area } from "vant";
import AreaList from "../assets/area";

export default {
  name: "addressEdit",
  data() {
    return {
      areaList: AreaList,
      searchResult: [],
      deletes: false,
      formaddress:'',
      addressInfo:{
          name:'',
          tel:'',
          county:'',
          addressDetail:''
      }
    };
  },
  mounted(){
      this.formaddress = JSON.parse(localStorage.getItem('mydatas'))
      console.log(this.formaddress)
      if (this.formaddress.name.length>0) {
          this.addressInfo.name = this.formaddress.name
      }
      if (this.formaddress.iphone.length>0) {
          this.addressInfo.tel = this.formaddress.iphone
      }
      if (this.formaddress.county.length>0) {
          this.addressInfo.county = this.formaddress.county
      }
       if (this.formaddress.addressDetail.length>0) {
          this.addressInfo.addressDetail = this.formaddress.addressDetail
      }
  },
  methods: {
    onSave(content) {
     this.formaddress.name = content.name
     this.formaddress.iphone = content.tel
     this.formaddress.county = content.city+content.county
     this.formaddress.addressDetail = content.addressDetail
     localStorage.setItem('mydatas', JSON.stringify(this.formaddress))
     this.$router.push('AFASDetil');
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onChangeDetail(val) {}
  }
};
</script>
<style scoped>
#apps >>> .van-button--danger{
    background-color:#fff;
    border: 1px solid #B39061;
    color: #B39061
}
</style>

<template>
  <section id="apps">
    <van-nav-bar
  class="init-header"
  title="新增地址"
  left-text=""
  right-text=""
  left-arrow
  @click-left="onClickLeft"
/>
      <van-address-edit
        :area-list="areaList"
        :show-postal="false"
         show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        :show-delete="deletes"
        @change-detail="onChangeDetail"
      />
  </section>
</template>

<script>
import { Area } from 'vant';
import AreaList  from '../assets/area';

export default {
  name: 'addressEdit',
  data() {
    return {
      areaList:AreaList,
      searchResult: [],
      deletes:false
    };
  },
  methods: {
    onSave() {
    
    },
    onClickLeft(){
      this.$router.back(-1);
    },
    onChangeDetail(val) {
     
    }
  }
};
</script>
<style scoped>
#apps >>> .van-address-edit__buttons .van-button{
  border-radius: 4px;
  border: 1px solid rgb(171, 134, 117);
  background-color: transparent;
  color: rgb(171, 134, 117);
  height: 35px;
  line-height: 35px;
}
#apps >>> .van-nav-bar .van-icon{
    color: #2c3e50
}
</style>

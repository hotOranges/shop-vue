<template>
  <section>
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
        show-postal
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
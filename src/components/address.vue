<template>
  <section id="app" style="    text-align: center;">
    <van-nav-bar
  class="init-header"
  title="我的收货地址"
  left-text=""
  right-text=""
  left-arrow
  @click-left="onClickLeft"
/>

      <van-address-list v-if="list.length>0"
        v-model="chosenAddressId"
        :list="list"
        :switchable="false"
        @add="onAdd"
        @edit="onEdit"
      />
      <div v-else style="margin-top:160px;text-align: center;padding-bottom: 240px;">
        <h5 style="color:#6B6B6B;">
          您还没有收货地址哦
        </h5>
        <button @click="onAdd" class="van-address-list__add" style="border-radius:4px;border:1px solid;border-color:#AB8675;background-color:transparent;color: rgb(171, 134, 117);height:35px">添加地址</button>
      </div>
  </section>
</template>
<script>

import { listShipping } from "../../src/api/login";
import { Toast } from "vant";

export default {
  data() {
    return {
      chosenAddressId: "1",
      listShippings:'',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ],
      add: "新增地址",
      edit: "编辑地址",
      disabledText: "以下地址超出配送范围"
    };
  },
  mounted(){
     let para = {
       token:JSON.parse(localStorage.getItem('token'))
     }
     listShipping(para).then(res => {
          var datas = [];
          this.listShippings = res
          for (var i in res) {
            var arrs = res[i]
           datas.push({
             id:arrs.id,
             name:arrs.consigneeName,
             tel:arrs.consigneePhone,
             address:arrs.region+arrs.address
           })
          }
          this.list = datas  
       
      })
  },
  methods: {
    onAdd() {
      this.$router.push("addressnew");
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onEdit(item, index) {
      this.$router.push({name: 'addressEdit', params: this.listShippings[index]})
    }
  }
};
</script>
<style scoped>
#app >>> .van-address-list__add {
  margin-top: 30px;
  width: 80%;
  position: relative;
}
</style>

<template>
  <section id="apps">
    <van-nav-bar
      class="init-header"
      title="编辑地址"
      left-text
      right-text
      left-arrow
      @click-left="onClickLeft"
    />
    <van-address-edit
      :area-list="areaList"
      :show-postal="false"
      :show-set-default="true"
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      :show-delete="deletes"
      @change-detail="onChangeDetail"
      :address-info="addressInfo"
    />
  </section>
</template>

<script>
import { Area } from "vant";
import AreaList from "../assets/area";
import { editShipping, delShipping } from "../../src/api/login";
import { Toast } from "vant";

export default {
  name: "addressEdit",
  data() {
    return {
      areaList: AreaList,
      searchResult: [],
      deletes: true,
      formaddress: "",
      addressInfo: {
        name: "",
        tel: "",
        county: "",
        addressDetail: ""
      }
    };
  },
  mounted() {
    this.formaddress = this.$route.params;
    if (this.formaddress.consigneeName.length > 0) {
      this.addressInfo.name = this.formaddress.consigneeName;
    }
    if (this.formaddress.consigneePhone.length > 0) {
      this.addressInfo.tel = this.formaddress.consigneePhone;
    }
    if (this.formaddress.areaCode.length > 0) {
      this.addressInfo.areaCode = this.formaddress.areaCode;
    }
    if (this.formaddress.address.length > 0) {
      this.addressInfo.addressDetail = this.formaddress.address;
    }
    if (this.formaddress.isDefault === "1") {
      this.addressInfo.isDefault = true;
    } else {
      this.addressInfo.isDefault = false;
    }
  },
  methods: {
    onSave(content) {
      var isDefault = content.isDefault == true ? 1 : 0;
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        consigneeName: content.name,
        consigneePhone: content.tel,
        region: content.province + "/" + content.city + "/" + content.county,
        address: content.addressDetail,
        isDefault: isDefault,
        areaCode: content.areaCode,
        shippingId: this.formaddress.id
      };
      Toast.loading({
        duration: 0,
        mask: true,
        forbidClick: false,
        message: "提交中..."
      });
      let LocalAdrrss = JSON.parse(localStorage.getItem("LocalAdrrss"));
      editShipping(para).then(res => {
        if (LocalAdrrss.id === this.formaddress.id) {
          let newaddress = {
            id: this.formaddress.id,
            name: content.name,
            tel: content.tel,
            address:
              content.province +
              "/" +
              content.city +
              "/" +
              content.county +
              content.addressDetail
          };
          localStorage.setItem("LocalAdrrss", JSON.stringify(newaddress));
        }
        Toast.clear();
        this.$router.back(-1);
      });
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onDelete(content) {
      let para = {
        token: JSON.parse(localStorage.getItem("token")),
        shippingId: this.formaddress.id
      };
      let LocalAdrrss = JSON.parse(localStorage.getItem("LocalAdrrss"));
      delShipping(para).then(res => {
        Toast("删除成功");
        if (LocalAdrrss.id === this.formaddress.id) {
          localStorage.removeItem("LocalAdrrss");
        }
        this.$router.back(-1);
      });
    },
    onChangeDetail(val) {}
  }
};
</script>
<style scoped>
#apps >>> .van-address-edit__buttons .van-button {
  border-radius: 4px;
  border: 1px solid rgb(171, 134, 117);
  background-color: transparent;
  color: rgb(171, 134, 117);
  height: 35px;
  line-height: 35px;
}
#apps >>> .van-nav-bar .van-icon {
  color: #2c3e50;
}
</style>
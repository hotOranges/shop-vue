
<template>
  <div>
  <van-nav-bar
  class="init-header"
  title="申请售后"
  left-text=""
  right-text=""
  left-arrow
  @click-left="onClickLeft"
/>

  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
      onClickLeft(){
        this.$router.back(-1);  
      }
  }
}

</script>
<style>
</style>
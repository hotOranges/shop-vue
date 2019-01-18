<template>
  <div id="app">
    <transition  :name="transitionName">
    <router-view  class="Router" />
    </transition>
  </div>
</template>

<script>
export default {
    name: 'App',
    // 提供reload方法
    provide: function () {
      return {
        reload: this.reload
      }
    },
    // isRouterAlive控制显示
    data: function () {
      return {
        isRouterAlive: true,
        transitionName: 'slide-left'
      }
    },

    methods: {
      // 刷新方法
      reload: function () {
        this.isRouterAlive = false;
        // 该方法会在dom更新后执行
        this.$nextTick(function () { this.isRouterAlive = true })
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>

<style>
#app {
  font-family: 'PingFangSC-Medium', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
.Router {
     position: absolute;
     width: 100%;
      transition: all .8s cubic-bezier(.55,0,.1,1);
}
</style>

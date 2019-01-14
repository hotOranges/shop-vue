<template>
  <ul id="chat-list" class="m-chat-list p-chat-list" style="padding-bottom:40px;margin-top:40px">
    <li class="u-msg item-time" v-if="canLoadMore">

    </li>
    <li class="u-msg item-time" v-else>
  
    </li>
    <chat-item
      v-for="msg in msglist"
      :type="type"
      :rawMsg="msg"
      :userInfos="userInfos"
      :myInfo="myInfo"
      :key="msg.idClient"
      @msg-loaded="msgLoaded"
    ></chat-item>
  </ul>
</template>
<script type="text/javascript">
  /*eslint-disable*/

  import util from '../utils'
  import config from '../configs'
  import emojiObj from '../configs/emoji'
  import ChatItem from './ChatItem'

  export default {
    components: {
      ChatItem
    },
    props: {
      type: String, // 类型，chatroom, session
      canLoadMore: [String, Boolean],
      msglist: {
        type: Array,
        default () {
          return []
        }
      },
      userInfos: {
        type: Object,
        default () {
          return {}
        }
      },
      myInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        isFullImgShow: false,
        msgLoadedTimer: null
      }
    },
    methods: {
      showFullImg (src) {
        this.$store.dispatch('showFullscreenImg', {
          src
        })
      },
      msgLoaded () {
        clearTimeout(this.msgLoadedTimer)
        this.msgLoadedTimer = setTimeout(() => {
          this.$emit('msgs-loaded')
        }, 20)
      }
    }
  }
</script>

<style type="scss">
  /* #chat-list{
    height: 580px;
  } */

  .p-chat-list {
    .u-icon {
      width: 1.4rem;
      height: 1.6rem;
      margin-right: 0.2rem;
      vertical-align: bottom;
    }
  }
</style>

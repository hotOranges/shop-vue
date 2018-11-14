<template>
  <div>
                    <!-- 商品列表 -->
                 <div class="over2">
                    <van-row  v-for="(img,index) in imageList.img_1" :key='img.id' class="lists">
                        <van-col span='8' offset="1" class="goods_list">
                            <div class="imgList" @click.stop="buy(img)">
                               <img  v-lazy="img" name="adapter" />
                            </div>
                            <van-col span="24" class="lazy-left">
                              <span>{{title.title_1[index]}}</span>
                            </van-col>

                             <van-col span="24" class="lazy-bottom">
                              <h4>￥{{limit_price.limit_p1[index]}} <span>￥{{original_price.origin_p1[index]}}</span></h4> 
                            </van-col>
                        </van-col>
    
                        <van-col span='8' offset="1" class="goods_list">
                            <div class="imgList" @click.stop="buy(imageList.img_2[index])">
                               <img  v-lazy="imageList.img_2[index]" name="adapter" />
                            </div>
                            <van-col span="24" class="lazy-left">
                              <span>{{title.title_2[index]}}</span>
                            </van-col>

                             <van-col span="24" class="lazy-bottom">
                              <h4>￥{{limit_price.limit_p2[index]}} <span>￥{{original_price.origin_p2[index]}}</span></h4> 
                            </van-col>

                        </van-col>
                <van-col span='8' offset="1" class="goods_list">
                            <div class="imgList" @click.stop="buy(imageList.img_2[index])">
                               <img  v-lazy="imageList.img_2[index]" name="adapter" />
                            </div>
                            <van-col span="24" class="lazy-left">
                              <span>{{title.title_2[index]}}</span>
                            </van-col>

                             <van-col span="24" class="lazy-bottom">
                              <h4>￥{{limit_price.limit_p2[index]}} <span>￥{{original_price.origin_p2[index]}}</span></h4> 
                            </van-col>

                        </van-col>
                    </van-row>
                  </div>

                
    </div>

</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex';
import { Waterfall } from 'vant';
import { Toast } from 'vant';

export default {
  name: 'goodsInfo',
  data() {
    return {
      tabarActive:0,
      count: 0,
    
      value:null,
      active:0,
      path:'../../static/images/',
      imageList:{
          img_1:[],
          img_2:[],
      },
      title:{
          title_1:[],
          title_2:[]
      },
      limit_price:{
          limit_p1:[],
          limit_p2:[],
      },
      original_price:{
          origin_p1:[],
          origin_p2:[],
      },
      discount:{
          dis_1:[],
          dis_2:[],
      },

      disabled:false,
    }
  },
  props:{
    
  },
  computed: {
    ...mapState({
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      src : state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
     
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
    }),
    ...mapGetters(['bc_notshow']),
  },
  methods: {
     search() {
       console.log(this.value)
     },
     search_shows(){
         this.$router.push('/');
     },
     buy(img) {
       this.buyParam(img);
       this.$router.push('/goods/id_0/buy');
     },
     ...mapActions(['buyParam'])
  },
  watch: {

  },
  directives: {
    //瀑布流
    WaterfallLower: Waterfall('lower'),
  },
  beforeCreate() {
     this.axios.get('./static/data.json').then((res)=>{
         //或许商品信息
          if( res.status == 200 ) {
                const data = res.data.goods;
                        this.title.title_1 = data.id_0.title[0];
                        this.title.title_2 = data.id_0.title[1];

                        this.imageList.img_1 = data.id_0.imgList[0];
                        this.imageList.img_2 = data.id_0.imgList[1];

                        this.limit_price.limit_p1 = data.id_0.limit_price[0];
                        this.limit_price.limit_p2 = data.id_0.limit_price[1];

                        this.original_price.origin_p1 = data.id_0.original_price[0];
                        this.original_price.origin_p2 = data.id_0.original_price[1];

                        this.discount.dis_1 = data.id_0.discount[0];
                        this.discount.dis_2 = data.id_0.discount[1];
              
            
              //  console.log(res.data.home.active,this.days,this.activeTitle)
           } else {
             this.imageList = this.src;
             
           }
            },(err)=>{
            this.imageList = this.src;
    })

  },
  created() {
     Toast('加载完毕 ^_^')
  }
}
</script>

<style lang="less" scoped>
@import url('../assets/css/goods.less');
</style>
<style scoped>

</style>




export default {
    state:{    
        tab:{
            title:['','推荐','手机','穿戴','健康'],
        },
        badge:{
            icon:['icon_1','icon_2','icon_8','icon_4','icon_5','icon_6','icon_7','icon_10'],
            title:['鞋包馆','运动馆','母婴馆','超市','女装馆','美妆馆','男装馆','更多'],
        },
        imageList:[],
        broadcast:[],
        bc:true,
        show:true,
        avgScore:0,
        sshow:false,
        shop_info:0,
        my_info:2,
        buyInfo:{
            img:[],
        },
        token:null,
        orderShow:false,
        numO:null,
    },
    mutations: {
        search_(state) {
            state.show = false;
        },
        buySearch(state,img) {
            state.buyInfo.img[0] = img;
            // console.log(state.buyInfo.img);
        },
        token_(state,token){
            state.token = token
        },
        orderShow_(state) {
            state.orderShow ? state.orderShow = false : state.orderShow = true;
            setTimeout(() => {
                state.orderShow = false;
              }, 220000);
        },
        orderShow_2(state) {
            state.orderShow ? state.orderShow = false : state.orderShow = true;
            setTimeout(() => {
                state.orderShow = false;
              }, 220000);
        },
        avgScoreNum_(state,e){
            state.avgScore = e;
        },
        addNum(state,e) {
            state.numO = e;
            // console.log(e);
        },
        shopCartInfo(state) {
            state.shop_info = JSON.parse(localStorage.getItem('getShopCarts')).length;
        },
        shopCartInf3(state) {
            state.shop_info = 0;
        },
        shopCartInfo2(state) {
            state.shop_info =state.shop_info + 1 ;
        }
    },
    actions: {
       searchA(context,e) {
           context.commit('search_');
       },
       newtoken(context,token){
        context.commit('token_',localStorage.getItem('token'));
       },
       buyParam(context,img) {
           context.commit('buySearch',img);
       },
       orderShows(context) {
           context.commit('orderShow_');
       },
       orderShowss(context){
            context.commit('orderShow_2');  
       },
       orderNum(context,e) {
         context.commit('addNum',e);
       },
       avgScoreNum(context,e) {
        context.commit('avgScoreNum_',e);
      },
       infoAction(context) {
         context.commit('shopCartInfo');
       },
       infoAction2(context) {
        context.commit('shopCartInfo3');
      },
       addInfoAction(context){
         context.commit('shopCartInfo2');
       }
    },
    getters: {
        bc_notshow(state){
            setTimeout(() => {
              state.bc = false;
            }, 20000);
            return state.bc;
        },
       
    }
}
<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-wrapper" @tap="gotoSearch(keyword)">
      <view class="search-input">
        <icon type="search" size="32rpx"></icon>
        {{keyword}}
      </view>
    </view>  
    <!-- 搜索框 end-->  

    <!-- tab栏 -->
    <view class="tabNav">
      <block v-for="(item,index) in tabsItem" :key="index">
        <view :class="{active:index===tabIndex}" >{{item}}</view>
      </block>
    </view>
    <!-- tab栏 end-->

    <!-- 商品列表 -->
    <view class="goodsList">
      <block v-for="(item,index) in goodsList" :key="index" >
        <view class="goodsItem" @tap="gotoDetail(item.goods_id)">
          <view class="goodsLeft">
            <image
              :src="item.goods_small_logo"
              lazy-load="false">
            </image>
          </view>
          <view class="goodsRight">
            <text>{{item.goods_name}}</text>
            <view class="price">
              ¥{{item.goods_price}}
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 商品列表 end-->

    <!-- 没有数据的时候提示 -->
    <view class="noneMone" v-show="!hasMore">
      没有更多数据了...
    </view>
    <!-- 没有数据的时候提示 end-->  
  </view>
</template>

<script>
// import request from "@/utils/request.js"
import { getSearch } from "@/api/index.js"
export default {
  components: {
    
  },

  data () {
    return {
      keyword:'',
      tabsItem:['综合','销量','价格'],
      tabIndex:0,
      goodsList:[],
      hasMore:true,
      pagenum:1,
      pagesize:20,
    }
  },
  onLoad(query){
    this.keyword=query.keyword;
    //列表数据渲染
    // request('').then(res=>{

    // });
    // request.get('goods/search').then((res)=>{
    //   console.log(res);
    // });
    this.getData();
   
  },
  onUnload(){
    this.initData();
  },
  methods:{
    //获取数据
    getData(){
      if(!this.hasMore) return;
      //加载提示
      wx.showLoading({
        title: '加载中...',
      })
      getSearch({
          query:this.keyword,
          pagenum:this.pagenum,
          pagesize:this.pagesize
      }).then((res)=>{
        const { goods } = res.data.message;
        //this.goodsList=goods;  
        this.goodsList=[...this.goodsList,...goods];
        //请求成功后，页码加一
         this.pagenum++;
         
         if(goods.length<this.pagesize){
           this.hasMore=false;
         }
        //加载成功后提示消失
        wx.hideLoading();
        //下拉刷新停止动画,在手机上停不了，需要手动加上代码去停止
        wx.stopPullDownRefresh();
      })
    },
    //跳转到搜索页面
    gotoSearch(keyword){
      wx.redirectTo({url:`/pages/search/main?keyword=`+keyword});
    },
    //跳转到商品详情
    gotoDetail(id){
      wx.navigateTo({url:`/pages/goods_detail/main?goods_id=`+id});
      //console.log(id);
    },
    //初始化数据
    initData(){
      this.goodsList=[];
      this.pagenum=1;
      this.hasMore=true;
    }
  },
  created () {
    
  },
  //页面触底事件
  onReachBottom(){
    this.getData();
    //console.log("aaa");
  },
  //下拉刷新事件
  onPullDownRefresh(){
    this.initData();
    this.getData();
  }
}
</script>

<style lang="scss">
.search-wrapper{
  background-color: #eee;
  padding:20rpx;
  .search-input{
      background:#fff;
      height:60rpx;
      font-size:15px;
      color:#999;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      color:#000;
  }
  .search-input icon{
      margin-right:5px;
      color:#ccc;
  }  
}
.tabNav{
  display:flex;
  border-bottom:1rpx solid #eee;
  view{
    flex:1;
    text-align: center;
    line-height: 60rpx;
    font-size:24rpx;    
  }
  .active{
    color:red;
  }
}
.goodsList{
  width:750rpx; 
  .goodsItem{
    width:100%;
    height:160rpx;
    border-bottom:1px solid #eee;
    padding:20rpx;
    display:flex;
    box-sizing: border-box;
    .goodsLeft{
      width:120rpx;
      height:120rpx; 
      image{
        width:120rpx;
        height:120rpx;
      }
    }
    .goodsRight{
      flex:1;
      flex-shrink: 0;
      padding-left:20rpx;
      font-size:24rpx;
      position:relative;
      text{
        overflow:hidden;
        text-overflow: ellipsis;
        white-space:normal;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
      }
      .price{
        color:red;
        position:absolute;
        bottom:0rpx;
        font-size:28rpx;
      }
    }
  }
}
.noneMone{
  width:750rpx;
  font-size:24rpx;
  text-align:center;
  line-height:60rpx;
  height:60rpx;
  text-align: center;
  color:#ccc;
}
</style>

<template>
  <div>

    <!-- 搜索 -->
    <view class="search-in">
      <navigator url="/pages/search/main" hover-class="none"><icon type="search" size="16" /> 搜索</navigator>
    </view>
    <!-- 搜索 end-->

    <!-- 轮播图 -->
    <swiper
      :indicator-dots="indicatorDots"
      indicatorColor="rgba(255,255,255,0.3)"
      indicatorActiveColor="rgba(255,255,255,1)"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 轮播图 end-->

    <!-- 导航按钮 -->
    <view class="navBox">
      <block v-for="(item,index) in catitems" :key="index">
        <image :src="item.image_src" mode="aspectfill"></image>
      </block>
    </view>
    <!-- 导航按钮 end-->

    <!-- 产品类别 -->
    <view class="pro">
      <block v-for="(item,index) in floordata" :key="index">
      <view class="h1">
        <image :src="item.floor_title.image_src"></image>
        <!-- title -->
      </view>
      <view class="proBox">
        <view class="proLeft">
          <image :src="item.product_list[0].image_src"></image>
        </view>
        <view class="proRight">
          <block v-for="(subItem,subIndex) in item.product_list" :key="subIndex">
            <!-- <image v-if="subIndex!==0" :src="item.product_list[subIndex].image_src"></image> -->
            <image v-if="subIndex!==0" :src="subItem.image_src"></image>
          </block>
        </view>
      </view>
      </block>
    </view>
    <!-- 产品类别 end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [],
      catitems:[],
      floordata:[],
      circular:true,
      // indicatorColor:"rgba(255,255,255,0.3)",
      // indicatorActiveColor:"rgba(255,255,255,1)",
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      
    };
  },

  components: {},

  methods: {},

  onLoad(){
    //轮播图数据渲染
    wx.request({    
      method:"get",
      url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata', 
      success:(res)=> {
        console.log(res);
        const {message} = res.data;
        this.imgUrls = message;
      }
    });
    //导航数据渲染
    wx.request({    
      method:"get",
      url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems', 
      success:(res)=> {
        console.log(res);
        const {message} = res.data;
        this.catitems = message;
      }
    });
    //楼层数据渲染
    wx.request({    
      method:"get",
      url: 'https://www.zhengzhicheng.cn/api/public/v1/home/floordata', 
      success:(res)=> {
        console.log(res);
        const {message} = res.data;
        this.floordata = message;
      }
    });
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style>
swiper{
  height:340rpx;
}
image {
  width:100%;
  height:100%;
}
.search-in{
  width:750rpx;
  height:100rpx;
  background-color: #eb4450;
  padding:20rpx;
  box-sizing:border-box;
}
.search-in navigator {
  width:100%;
  height:60rpx;
  background:#fff;
  border-radius: 4px;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size:24rpx;
}
.search-in navigator icon{
  margin-right:10rpx;
}
.proBox{
  width:750rpx;
  height:386rpx;
  display:flex;
  padding:0 10rpx;
  box-sizing:border-box;
}
.proLeft{
  flex:1;
}
.proRight{
  flex:2;
}
.proRight image{
  width:48%;
  height:190rpx;
  margin-left:10rpx;
}
.proBox h1{
  width:750rpx;
}
.pro .h1{
  width:750rpx;
  height:60rpx;
  line-height:60rpx;
  padding:10rpx;
  font-size:16px;
}
.navBox{
  width:750rpx;
  height:140rpx;
  display:flex;
  justify-content: space-around;
  padding:20rpx 0;
}
.navBox image{
  width:128rpx;
  height:140rpx;
}
</style>

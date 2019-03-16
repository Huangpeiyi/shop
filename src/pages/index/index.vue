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
          <image :src="item" class="slide-image" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 轮播图 end-->

    <!-- 导航按钮 -->
    <view class="navBox">
      <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/icon_index_nav_4@2x.png" mode="aspectfill"></image>
      <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/icon_index_nav_3@2x.png" mode="aspectfill"></image>
      <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/icon_index_nav_2@2x.png" mode="aspectfill"></image>
      <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/icon_index_nav_1@2x.png" mode="aspectfill"></image>
    </view>
    <!-- 导航按钮 end-->

    <!-- 产品类别 -->
    <view class="pro">
      <view class="h1">产品类别</view>
      <view class="proBox">
        <view class="proLeft">
          <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_1@2x.png"></image>
        </view>
        <view class="proRight">
          <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_2@2x.png"></image>
          <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_3@2x.png"></image>
          <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_4@2x.png"></image>
          <image src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_5@2x.png"></image>
        </view>
      </view>
    </view>
    <!-- 产品类别 end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        "https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/banner1.png",
        "https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/banner2.png",
        "https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/banner3.png"
      ],
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

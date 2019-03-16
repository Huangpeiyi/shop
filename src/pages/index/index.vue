<template>
  <div>
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
</style>

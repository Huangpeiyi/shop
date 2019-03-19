<template>
<view class="search">
     <!-- 搜索 -->
    <view class="search-in">
      <navigator url="/pages/search/main" hover-class="none"><icon type="search" size="16" /> 搜索</navigator>
    </view>
    <!-- 搜索 end-->
    
</view>   
</template>

<script>
export default {

}
</script>

<style>
.search::after{
  width:750rpx;
  height:100rpx;
  content:" ";
  display:block;
}
.search-in{
  width:750rpx;
  height:100rpx;
  background-color: #eb4450;
  padding:20rpx;
  box-sizing:border-box;
  position:fixed;
  top:0;
  left:0;
  z-index: 99;
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
</style>

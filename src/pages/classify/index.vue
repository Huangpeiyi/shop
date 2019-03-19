<template>
  <view class="classifyBox">
    <!-- 搜索 -->
    <search></search>
    <!-- 搜索 end-->

    <!-- 分类 -->
    <view class="classify">
      <scroll-view class="classifyLeft" scroll-y>
        <block v-for="(item,index) in cate" :key="index">
          <view :class="{active:index===tabindex}" @tap="activehandle(index)">{{item.cat_name}}</view>
          <!-- <view :class="index==tabindex?'active':''" @tap="activehandle(index)">{{item}}</view> -->
        </block>
      </scroll-view>
      <scroll-view class="classifyRight" scroll-y>  
        <block v-for="(item,index) in rightData" :key="index">
          <view class="h1">{{item.cat_name}}</view>
          <view class="Item">
            <block v-for="(sunItem,subIndex) in item.children" :key="subIndex">
              <view class="cell" @tap="gotoGoodsList(sunItem.cat_name)">              
                <image :src="sunItem.cat_icon"></image>
                <view>{{sunItem.cat_name}}</view>              
              </view>
            </block>
          </view>
        </block>
      </scroll-view>
    </view>
    <!-- 分类 end-->
  </view>
</template>

<script>
import Search from "../../components/Search"
import request from "../../utils/request.js"
export default {
  data () {
    return {
     tabindex:0,
     cate:[],
     rightData:[],
    }
  },

  components: {
    Search
  },

  methods: {
    activehandle(index){
      // console.log("aaa");
      this.tabindex = index;
      //先清空
      this.rightData=[];
      //定时器延迟1秒再加载
      setTimeout(()=>{
        this.rightData=this.cate[this.tabindex].children;
      },0);   
    },
    gotoGoodsList(name){
      wx.navigateTo({
        url: '/pages/goods_list/main'+'?keyword='+name
      })
    }
  },

  created () {
    // let app = getApp()
  },
  onLoad(){
    //加载中动画
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    //加载数据
    request("https://www.zhengzhicheng.cn/api/public/v1/categories").then((res)=>{
      //console.log(res);
      const {message} = res.data;
      //console.log(message);
      this.cate=message;
      this.rightData=this.cate[this.tabindex].children;
      //console.log(this.rightData);
      //加载成功后
      wx.hideLoading();
    })
  }
}
</script>

<style>
.classify{
  display:flex;
  position:fixed;
  top:100rpx;
  left:0;
  right:0;
  bottom:0;
}
.classifyLeft{
  width:200rpx;
  background-color: #eee;
  font-size:24rpx;
}
.item{
  width:200rpx;
  height:60rpx;
}
.classifyLeft .active{
  position:relative;
  background-color: #fff;
}
.classifyLeft .active::before{
  width:10rpx;
  position:absolute;
  top:5rpx;
  bottom:5rpx;
  background:red;
  content:"";
  display:block;
}
.classifyLeft view{
  height:70rpx;
  line-height:70rpx;
  text-align: center;
}
.classifyRight{
  flex:1;
}
.classifyRight .h1{
  width:100%;
  height:70rpx;
  text-align: center;
  line-height:70rpx;
  font-size:32rpx;
}
.classifyRight .h1::after,.classifyRight .h1::before{
  content:" / ";
  display:inline-block;
  margin:0 20rpx;
  color:#ccc;
}
.classifyRight .Item{
  display:flex; 
  flex-wrap: wrap; 
  margin-bottom:20rpx;
}
.classifyRight .Item .cell{ 
  text-align: center;
  /* padding:10rpx; */
  width:33.3%;
  margin-bottom:10rpx;
  font-size:24rpx;
}
.classifyRight .Item .cell image{
  width:120rpx;
  height:120rpx;
}
</style>

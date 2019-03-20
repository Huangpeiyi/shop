<template>
  <view>
    <!-- 轮播图分区 -->
    <swiper 
      indicator-dots="true"
      indicator-color="rgba(255,255,255,0.3)"
      indicator-active-color="rgba(255,255,255,1)"
    >
    <block v-for="(item,index) in detail.pics" :key="index">
      <swiper-item>
        <image
          :src="item.pics_big_url"
          mode="scaleToFill"
          lazy-load="false"
          @tap="previewBIgImage(item.pics_big_url)"
          >
        </image>
      </swiper-item> 
    </block>
    </swiper>
    <!-- 轮播图分区 end-->

    <!-- 商品价格商品基本信息 -->
    <view class="goods-price">
      ¥{{detail.goods_price}}
    </view>
    <view class="goods-info">
      <view class="info-left">
        {{detail.goods_name}}
      </view>
      <view class="info-right">
        <view class="iconfont icon-shoucang"></view>
        收藏
      </view>
    </view>
    <!-- 商品价格商品基本信息 end-->

    <!-- 商品详情 -->
    <view class="detail">
      <view class="detail-title"> 
        商品详情标题
      </view>
      <view class="detail-content"> 
        <rich-text type="node" :nodes="detail.goods_introduce"></rich-text>
      </view>
    </view>
    <!-- 商品详情 end-->

    <!-- 底部固定条 -->
    <view class="footer">
      <view class="contact">
        <button open-type="contact">打开客服聊天窗口</button>
      </view>
      <view class="ft-left">
        <view class="iconfont icon-kefu"></view>
        联系客服
      </view>
      <navigator class="ft-left" open-type="switchTab" url="/pages/cart/main">
        <view class="iconfont icon-caigou"></view>
        购物车
      </navigator>
      <view class="ft-right" @tap="addToCart(detail.goods_id)">
        加入购物车
      </view>
      <view class="ft-right">
        立即购买
      </view>
    </view>
    <!-- 底部固定条 end-->
  </view>
</template>

<script>
import { getDetail } from "@/api"
export default {
  components: {
    
  },

  data () {
    return {
     goods_id:"",
     detail:{},
    }
  },
  onLoad(query){
    this.goods_id=query.goods_id;
    getDetail({
      goods_id:query.goods_id
    }).then((res)=>{
      this.detail=res.data.message;
    });
  },
  methods:{
    //轮播图点击看大图
    previewBIgImage(current){
      //方法一
      let imgUrls = this.detail.pics.map((v)=>{
        return v.pics_big_url
      });
      //方法二
      // let imgUrls=[];
      // this.detail.pics.forEach(item=>{
      //   // API调用的个是要求数组中直接存放字符串
      //   imgUrls.push(item.pics_big_url);
      // });
      //console.log(imgUrls);
      wx.previewImage({
        current,
        urls: imgUrls
      })
    },
    //加入购物车
    addToCart(id){
      if(!id) return;
      //加入购物车提示
      wx.showToast({
        title:"加入购物车成功",
        mask:true,
        duration:1000,
        icon:"success"
      });

      let cartList=wx.getStorageSync('cartList') || {};

      //判断本地存储中有没有这个商品
      if(cartList[id]){
        cartList[id].count++
      }else{
        cartList[id]=this.detail;
        cartList[id].count=1;
      }

      //设置选中状态
      cartList[id].selected=true;
      //点击加入购物车的时候直接存储到本地
      wx.setStorageSync('cartList',cartList);
    }
  }
 
}
</script>

<style lang="scss">
// 1.0 轮播图分区
swiper{
    height:720rpx;

    image{
        height:720rpx;
        width:750rpx;
    }
}

// 2.0 商品价格商品基本信息
.goods-price{
    padding:20rpx;
    color:red;
    font-size:22px;
}

.goods-info{
    padding:20rpx;
    padding-top:0;
    display: flex;

    .info-left{
      flex:1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .info-right{
        width:160rpx;
        flex-shrink: 0;
        text-align: center;
        color:#999;
        border-left:1px #999 solid;
        font-size:14px;
        margin-left:20rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        // 修改字体图标大小
        .icon-shoucang{
          font-size:44rpx;
        }
    }
}

// 3.0 商品详情
.detail{
    border-top:20rpx #eee solid;
    padding-bottom:120rpx;
    .detail-title{
        padding:20rpx;
        border-bottom:1px #eee solid;
    }
    .detail-content{
      // 父级字号设置为0，清除富文本图片之间的默认间距
      font-size: 0;
    }
}

// 4.0 底部固定条
.footer{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    height:100rpx;
    background:#fff;
    display: flex;

    .contact{
        width:20%;
        height:100rpx;
        padding:0;
        margin:0;
        position: absolute;
        left:0;
        top:0;
        // 隐藏真正的客服聊天按钮
        opacity: 0;
    }

    .ft-left{
        width:20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:#666;
        font-size: 14px;

        .iconfont{
            font-size:18px;
        }
    }

    .ft-right{
        width:30%;
        background: orange;
        line-height: 100rpx;
        text-align: center;
        color:#fff;

        &:last-child{
            background: red;
        }
    }

}
</style>

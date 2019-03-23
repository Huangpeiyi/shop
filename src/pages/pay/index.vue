<template>
  <view >
    
    <!-- 顶部地址选择 -->
    <view class="cart-top" >
        <view class="user" >
          <text>收货人：{{address.username}}</text>
          <text>{{address.tel}}</text>
        </view>
        <view class="address">
          收货地址：{{address.addressInfo}}
        </view>
      <view class="address-border"></view>     
    </view>
    <!-- 顶部地址选择 end-->

    <!-- 2.0 店铺标题和商品列表 -->
    <view class="list-title">优购生活馆</view>
    <view class="ware-list">
      <!-- 2.0.1 商品列表 -->
      <block v-for="(item,index) in cartList" :key="index">
        <view class="ware-item" @tap="gotoDetail(item.goods_id)" v-if="item.selected">
          <!-- 2.0.3 右边图片和商品信息 -->
          <div class="ware-content">
            <!-- 2.0.4 图片 -->
            <view class="ware-image">
              <image :src="item.pics[0].pics_sma_url" mode="aspectFill"></image>
            </view>
            <!-- 2.0.5 商品信息 -->
            <view class="ware-info">
              <view class="ware-info-title">
                {{item.goods_name}}
              </view>
              <div class="ware-info-btm">
                <view class="ware-price">
                  ￥ {{item.goods_price}}
                </view>
                <div class="calculate">
                  X {{item.count}}
                </div>
              </div>
            </view>
          </div>
        </view>
      </block>
    </view>
    <!-- 3.0 底部固定条 -->
    <div class="cart-total">
      <view class="total-center">
        <view>合计:<text class="color-red">￥ {{computedData._allPrice}}</text> </view>
        <div class="price-tips">包含运费</div>
      </view>
      <view class="accounts" @tap="payorder">
        支付({{computedData._count}})
      </view>
    </div>
    
    
  </view>
</template>

<script>
import { createOrder , payOrder , payOrderUpdata } from "@/api";

export default {
  data () {
    return {
      address:{
        username:"",
        tel:"",
        addressInfo:""
      },
      cartList:{},
      //allSelect:true,
    }
  },
  computed: {
    computedData(){
      let _allPrice=0;
      let _count=0;
      let _cartLength=Object.keys(this.cartList).length;
      for(let key in this.cartList){
        let item=this.cartList[key];
        if(item.selected){
          _allPrice += this.cartList[key].goods_price ;
          _count++;
        }
        
      }
      return {_allPrice,_count,_cartLength};
    }
  },
  onShow(){
    this.address = wx.getStorageSync('address') || {}; 
    //数据渲染后goosd_id是从小到大排列的，不是按加入购物车的顺序排列，怎么解决这个问题？用时间戳,一般是后台处理排序问题，前端做会影响性能
    this.cartList = wx.getStorageSync('cartList') || {};
    console.log(this.cartList);  
  },

  methods: {
    gotoDetail(id){
      wx.navigateTo({url:`/pages/goods_detail/main?goods_id=`+id});
    },
    payorder(){
      //wx.navigateTo({url:`/pages/goods_detail/main?goods_id=`+id});
      //console.log("发起微信支付");
      const token = wx.getStorageSync('token');
      // 7.0.1 判断是否有 token
      if(token){
        //console.log("支付逻辑");
        //获取支付金额
        let order_price = this.computedData._allPrice;
        //获取订单地址
        let consignee_addr = this.address.addressInfo;
        //初始化商品列表数组
        let goods = [];
        for(let key in this.cartList){
          let item = this.cartList[key];
          if(item.selected){
            // 7.3.5 获取订单提交时候的商品信息
            let obj = {
              goods_id : item.goods_id,
              goods_price : item.goods_price,
              goods_number : item.count
            };
            goods.push(obj);
          }
        }
        //向服务器创建订单
        createOrder({
          order_price,
          consignee_addr,
          goods
        }).then(res=>{
          // console.log(res.data.message)
          const { order_number } = res.data.message;       
          // 7.4 向服务器发起订单支付
          payOrder({
            order_number
          }).then(res=>{
            // 7.4.1 获取订单支付对象
            const { pay } = res.data.message;
            // console.log(pay);

            
            // 7.5 调用微信支付接口
            wx.requestPayment({
              ...pay,
              success: res => {
                console.log("用户成功支付");
                // 7.6 向服务器传递订单编号，更新订单的支付状态
                payOrderUpdata({
                  order_number
                })                
                wx.switchTab({ url: '/pages/cart/main' });
              },
              fail: () => {
                console.log("用户支付失败");
                wx.switchTab({ url: '/pages/cart/main' });
              },
              complete:()=>{
                console.log(1);
                //把本地存储的选中的删除
                let _cartList={};
                for(let key in this.cartList){
                  let item = this.cartList[key];
                  if(!item.selected){
                    //console.log(item);
                    _cartList[key]=item;
                  }
                }
                this.cartList=_cartList;
                wx.setStorageSync('cartList',this.cartList);
              }
            });
          })
        })
      }else{
        console.log("登录授权");
        wx.navigateTo({ url: '/pages/auth/main' });
      }    
    }
  }
}
</script>

<style lang="scss">
// 1.0 顶部地址选择
.cart-top {
    min-height: 180rpx;
    position: relative;
    .user {
        display: flex;
        padding: 20rpx;
        justify-content: space-between;
        position: relative;
        padding-right: 50rpx;
        &:after {
            display: block;
            content: "";
            width: 12px;
            height: 12px;
            border-top: 1px #999 solid;
            border-right: 1px #999 solid;
            transform: rotate(45deg);
            position: absolute;
            right: 20rpx;
            top: 20rpx;
            margin-top: 6px;
        }
    }
    .address {
        padding: 20rpx;
        padding-top: 0;
    }
    .address-border {
        width: 100%;
        height: 8px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: red;
    }
    .add-address {
        height: 180rpx;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

// 2.0 页面选择按钮颜色
.icon-choosehandle {
    color: #ccc;
    font-size:34rpx;
}
.allSelect{
  color:#ff2d4a;
}
.selectbtn{
  color:#ff2d4a;
}
// 2.0.1 店铺标题和商品列表
.list-title {
    padding: 20rpx;
    border-bottom: 1px #eee solid;
    border-top: 10px #eee solid;
}

.ware-list {
    padding-bottom: 100rpx;
}

.ware-item {
    padding: 20rpx;
    padding-bottom: 0;
    display: flex;
    align-items: center;

    .choice-button {
        flex-shrink: 0;
        text-align: center;
        margin-right: 20rpx;
        font-size: 32rpx;
    }

    .ware-content {
        display: flex;
        flex: 1;
        justify-content: space-between;
        border-bottom: 1px #eee solid;
        padding-bottom: 20rpx;
    }

    .ware-image {
        image {
            display: block;
            width: 200rpx;
            height: 200rpx;
        }
    }

    .ware-info {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .ware-info-title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .ware-info-btm {
            display: flex;
            justify-content: space-between;
            .ware-price {
                color: red;
            }
            .calculate {
                display: flex;

                .rect {
                    width: 20px;
                    text-align: center;
                    border: 1px #999 solid;
                    line-height: 1.2;
                }
                .number {
                    margin: 0 10px;
                }
            }
        }
    }
}

// 3.0 底部固定条
.cart-total {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .total-button {
        padding-left: 20px;
        display: flex;
        align-items: center;
        .iconfont {
            margin-right: 10px;
        }
    }
    .total-center {
        flex: 1;
        padding: 20rpx;
        text-align: right;
        .color-red {
            color: red;
        }
        .price-tips {
            font-size: 14px;
            color: #666;
        }
    }
    .accounts {
        width: 30%;
        height: 100rpx;
        background: red;
        color: #fff;
        line-height: 100rpx;
        text-align: center;
    }
}
</style>
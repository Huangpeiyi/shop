<template>
  <view >
    <block v-if="computedData._cartLength">
    <!-- 顶部地址选择 -->
    <view class="cart-top" @tap="chooseAddressHandle">
      <block v-if="address.username">
        <view class="user" >
          <text>收货人：{{address.username}}</text>
          <text>{{address.tel}}</text>
        </view>
        <view class="address">
          收货地址：{{address.addressInfo}}
        </view>
      </block>
      <block v-else>
        <view class="add-address">
          <button>+添加收货地址</button>
        </view>
      </block>  
      <view class="address-border"></view>     
    </view>
    <!-- 顶部地址选择 end-->

    <!-- 2.0 店铺标题和商品列表 -->
    <view class="list-title">优购生活馆</view>
    <view class="ware-list">
      <!-- 2.0.1 商品列表 -->
      <block v-for="(item,index) in cartList" :key="index">
        <view class="ware-item" @tap="gotoDetail(item.goods_id)">
          <!-- 2.0.2 左边按钮 -->
          <view class="choice-button" >
            <view 
            :class="['iconfont', 'icon-choosehandle',{'selectbtn':item.selected===true}]" 
            @tap.stop="item.selected=!item.selected"
            ></view>
          </view>
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
                  <div class="rect" @tap.stop="changeCount(item.goods_id,-1)">-</div>
                  <div class="number">{{item.count}}</div>
                  <div class="rect" @tap.stop="changeCount(item.goods_id,1)">+</div>
                </div>
              </div>
            </view>
          </div>
        </view>
      </block>
    </view>
    <!-- 3.0 底部固定条 -->
    <div class="cart-total">
      <view class="total-button" @tap="allSelectHandle(computedData._cartLength === computedData._count)">
        <!-- <view 
          :class="['iconfont','icon-choosehandle',{'allSelect': allSelect === true}]"
          ></view> -->
          <!-- 这种写法不行 -->
          <!-- <view 
          :class="['iconfont','icon-choosehandle',{computedData._cartLength === computedData._count? 'allSelect':''}]"
          ></view> -->
          <!-- 写法1：-->
          <view 
          :class="['iconfont','icon-choosehandle',{'allSelect': computedData._cartLength === computedData._count}]"
          ></view>
          <!-- 写法2：-->
          <!-- <view 
          class="iconfont icon-choosehandle"
          :class="computedData._cartLength === computedData._count?'allSelect':''"
          ></view> -->
          全选
        <!-- 全选{{computedData._cartLength}} -->
      </view>
      <view class="total-center">
        <view>合计:<text class="color-red">￥ {{computedData._allPrice}}</text> </view>
        <div class="price-tips">包含运费</div>
      </view>
      <view class="accounts" @tap="gotoPay">
        结算({{computedData._count}})
      </view>
    </div>
    </block>
    <block v-else>
      购物车空空如也
    </block>
  </view>
</template>

<script>

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
          _allPrice = item.goods_price *item.count + _allPrice;
          _count++;
        }
        
      }
      wx.setStorageSync('cartList',this.cartList);
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
    //选择收货地址
    chooseAddressHandle(){
      wx.chooseAddress({
        success:(res)=>{
          // console.log(res.userName)
          // console.log(res.postalCode)
          // console.log(res.provinceName)
          // console.log(res.cityName)
          // console.log(res.countyName)
          // console.log(res.detailInfo)
          // console.log(res.nationalCode)
          // console.log(res.telNumber)
          let { userName , telNumber ,provinceName,cityName,countyName,detailInfo}=res;
          this.address={
            username:userName,
            tel:telNumber,
            addressInfo:`${provinceName}${cityName}${countyName}${detailInfo}`
          }
          //添加到本地存储
          wx.setStorageSync('address',this.address);
        }
      })
    },
    //点击全选
    allSelectHandle(bl){
      for(let key in this.cartList){
        let item = this.cartList[key];
        item.selected=!bl;
      }
    },
    //点击数量减的时候
    // rectHandle(id){
    //   if(this.cartList[id].count===1) return;
    //   this.cartList[id].count--;
    //   //这个的count是有变化的，但是一刷新页面又变回
    //   console.log(this.cartList);
    //   //数量减少后为什么不能把本地存储的数据更新？
    //   //this.cartList=wx.getStorageSync('cartList',this.cartList);
    // },
    //点击数量加的时候
    // addHandle(id){
    //   this.cartList[id].count++;
    //   //数量增加后为什么不能把本地存储的数据更新？
    //   //this.cartList==wx.setStorageSync('cartList',this.cartList);
    // },
    //改变数量
    changeCount(id,num){
      //修改商品数量
      this.cartList[id].count+=num;
      if(this.cartList[id].count===0){
        //弹出模态框
        wx.showModal({
          title: '提示',
          content: '确定要删除吗',
          showCancel:true,
          confirmText: '删除',
          confirmColor: '#f00', 
          success:res=> {
            if (res.confirm) {
              //console.log('用户点击确定');
              this.cartList[id].count=1;
              delete this.cartList[id];
            } else if (res.cancel) {
              //console.log('用户点击取消');
              this.cartList[id].count=1;
            }
          }
        })
      }
    },
    gotoDetail(id){
      wx.navigateTo({url:`/pages/goods_detail/main?goods_id=`+id});
    },
    gotoPay(){
      wx.navigateTo({ url: '/pages/pay/main' });
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
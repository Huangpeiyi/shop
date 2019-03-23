<template>
  <view >
   <button type="primary" open-type="getUserInfo" @getuserinfo="getToken">登录授权</button>
  </view>
</template>

<script>
import {userLogin} from "@/api"

export default {
  data () {
    return {
      
    }
  },
  methods: {
   getToken(e){
      // 1.0.1 获取登录需要的用户信息
      // console.log(e);
      // debugger;
      const {encryptedData,iv,rawData,signature} = e.mp.detail;
      // 1.0.2  获取 code 信息
      wx.login({
        // 1.0.3 获取成功的回调函数
        success: res => {
          // 1.0.4 获取 code 信息
          const {code} =  res;
          // 1.0.5 把 <5个用户信息参数> 发送到服务器，
          userLogin({
            code,
            encryptedData,
            iv,
            rawData,
            signature
          }).then(res=>{ 
            // 1.0.6 如果服务器校验成功，获取 token
            const {token} = res.data.message;
              // 1.0.7 把 token 保存到本地
              wx.setStorageSync('token',token);
              // 1.0.8 获取 token 成功后，返回授权前的页面
              wx.navigateBack({
                delta: 1
              });
          })
        },
      });
    }
  }
}
</script>


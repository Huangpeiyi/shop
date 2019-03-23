

function request(url,data={},header={},method="GET"){
    return new Promise((resolve,reject)=>{
        wx.request({
            url,
            data,
            header,
            method,
            success:(res)=>{
                resolve(res);
            },
            fail:()=>{
                reject();
            }
        })
    })
}
//封装根路径
request.baseURL="https://www.zhengzhicheng.cn/api/public/v1/";
//get请求
request.get=function(url,data){
    return request(request.baseURL+url,data,{},"GET");
};
//post请求
request.post=function(url,data){
    return request(request.baseURL+url,data,{},"POST");
};

// 2.0.4 封装授权专属的方法，默认用 POST 发请求
request.auth = function(url, data) {
    // 2.0.4.1 获取 token
    const token = wx.getStorageSync('token');
    // 如果有 token 就把 token 添加到请求头
    if(token){
      return request(request.baseURL + url, data, {
        "Authorization" : token
      }, "POST");
    }else{
      // 如果没有token，就跳转到授权页获取 token
      wx.navigateTo({ url: '/pages/auth/main' });
      // 返回 Promise，防止调用接口 then 的时候报错
      return new Promise(()=>{});
    }
  };
  
  request.authGet = function(url, data) {
    // 2.0.4.1 获取 token
    const token = wx.getStorageSync('token');
    // 如果有 token 就把 token 添加到请求头
    if(token){
      return request(request.baseURL + url, data, {
        "Authorization" : token
      }, "GET");
    }else{
      // 如果没有token，就跳转到授权页获取 token
      wx.navigateTo({ url: '/pages/auth/main' });
      // 返回 Promise，防止调用接口 then 的时候报错
      return new Promise(()=>{});
    }
  };
export default request;
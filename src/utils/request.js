

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
export default request;
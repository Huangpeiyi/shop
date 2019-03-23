import request from "@/utils/request.js";

// 获取商品列表
export const getSearch = obj => request.get("goods/search", obj);
// 获取搜索提示列表
export const getTips = obj => request.get("goods/qsearch", obj);
// 获取商品详情
export const getDetail = obj => request.get("goods/detail", obj);

// 用户登录换取 token
export const userLogin = obj => request.post("users/wxlogin", obj);

// =====================以下接口全部都需要授权后才能访问 ===========

// 创建订单
export const createOrder = obj => request.auth("my/orders/create", obj);
// 支付订单
export const payOrder = obj => request.auth("my/orders/req_unifiedorder", obj);
// 订单支付状态更新
export const payOrderUpdata = obj => request.auth("my/orders/chkOrder", obj);
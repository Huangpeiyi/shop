import request from "@/utils/request.js";

// 获取商品列表
export const getSearch = obj => request.get("goods/search", obj);
// 获取搜索提示列表
export const getTips = obj => request.get("goods/qsearch", obj);
// 获取商品详情
export const getDetail = obj => request.get("goods/detail", obj);
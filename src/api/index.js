import request from "@/utils/request.js";

export const getSearch = obj=>request.get('goods/search',obj);

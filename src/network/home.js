import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
export function getHomeGoods(type, page) {
  return request({
    url:'/mock/goods',
    params:{
      type,
      page
    }
  })
}

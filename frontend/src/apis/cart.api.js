import http from '../utils/http'

const cartApi = {
  addtoCart({ product_id, buy_count }) {
    return http.post('/cart/add', { product_id, buy_count })
  },
  getCartList() {
    return http.get('/cart/list')
  },
  updateCart({ product_id, buy_count }) {
    return http.patch('/cart/update', { product_id, buy_count })
  },
  deleteCart({ item_id }) {
    return http.delete(`/cart/clear?item_id=${item_id}`)
  },
  buyProducts(ids) {
    return http.patch('/cart/buy', [...ids])
  }
}
export default cartApi

import http from '../utils/http'

const categoryApi = {
  getCategories() {
    return http.get('/categories')
  },
  getCartList() {
    return http.get('/cart/list')
  }
}
export default categoryApi

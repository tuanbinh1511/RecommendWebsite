import http from '../utils/http'

const Url = 'products'
const url = 'products_user'
const URL = 'product'
const productApi = {
  getProducts(params) {
    return http.get(url, { params })
  },
  getProductDetail(id) {
    return http.get(`${URL}?id=${id}`)
  },
  getProductsNoLogin(params) {
    return http.get(Url, { params })
  }
}
export default productApi

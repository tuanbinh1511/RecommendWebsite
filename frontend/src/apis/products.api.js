import http from '../utils/http'

const url = 'products'
const URL = 'product'
const productApi = {
  getProducts(params) {
    return http.get(url, { params })
  },
  getProductDetail(id) {
    return http.get(`${URL}?id=${id}`)
  }
}
export default productApi

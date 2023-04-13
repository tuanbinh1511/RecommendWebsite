import http from '../utils/http'

const url = 'trangchu'
const URL = 'product'
const productApi = {
  getProducts(params) {
    return http.get(url, { params })
  },
  getProductDetail(id) {
    return http.get(`${URL}/${id}`)
  }
}
export default productApi

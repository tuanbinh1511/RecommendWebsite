import http from '../utils/http'

const categoryApi = {
  getCategories() {
    return http.get('/categories')
  }
}
export default categoryApi

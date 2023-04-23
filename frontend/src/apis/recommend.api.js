import http from '../utils/http'

const recommendApi = {
  getRecommend(item_id) {
    return http.get(`/recommender?item_id=${item_id}`)
  }
}
export default recommendApi

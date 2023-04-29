import http from '../utils/http'

const userApi = {
  getProfile() {
    return http.get('/profile')
  },
  updateProfile(body) {
    return http.patch('/update', body)
  },
  changePassword(body) {
    return http.patch('/change-password', body)
  },
  historyPurchase() {
    return http.get('/orders')
  }
}
export default userApi

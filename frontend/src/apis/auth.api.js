import http from '../utils/http'

export const registerAccount = (body) => http.post('/register', body)
export const loginAccount = (body) => http.post('/login', body)
export const logoutAccount = () => http.post('/logout')

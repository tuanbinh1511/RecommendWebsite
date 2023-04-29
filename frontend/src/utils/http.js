import axios, { HttpStatusCode } from 'axios'

import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth'
import path from '../constants/path'
class Http {
  accessToken
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8000/',
      timeout: 10000,
      headers: {
        // 'Content-Type': 'multipart/form-data ',
        Authorization: `Bearer ${this.accessToken}`
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          // config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          this.accessToken = response?.data?.access_token
          setAccessTokenToLS(this.accessToken)
          // } else if (url === path.profile) {
          //   setProfileFromLS(response?.data[0])
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error) {
        if (error.response !== HttpStatusCode.UnprocessableEntity) {
          // const message = error.response?.data.message || error.message
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http

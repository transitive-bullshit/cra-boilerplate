/**
 * @class API
 */

import AuthManager from 'store/AuthManager'

import { computed } from 'mobx'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL || '/'

class API {
  baseUrl = baseUrl

  // --------------------------------------------------------------------------
  // Auth
  // --------------------------------------------------------------------------

  async signin(data) {
    return this._request({
      url: `/1/auth/signin`,
      method: 'put',
      data
    }).then(res => res.data)
  }

  async signup(data) {
    return this._request({
      url: `/1/auth/signup`,
      method: 'post',
      data
    }).then(res => res.data)
  }

  async authWithGitHub(data) {
    return this._request({
      url: `/1/auth/github`,
      method: 'put',
      data
    }).then(res => res.data)
  }

  // --------------------------------------------------------------------------
  // Users
  // --------------------------------------------------------------------------

  async getMe() {
    return this._request({
      url: `/1/me`
    }).then(res => res.data)
  }

  async updateMe(data) {
    return this._request({
      url: `/1/me`,
      method: 'put',
      data
    }).then(res => res.data)
  }

  // --------------------------------------------------------------------------
  // Internal
  // --------------------------------------------------------------------------

  @computed get _request() {
    const headers = {}
    const token = (AuthManager.auth && AuthManager.auth.token)

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    return axios.create({
      baseURL: baseUrl,
      responseType: 'json',
      headers
    })
  }
}

export default new API()

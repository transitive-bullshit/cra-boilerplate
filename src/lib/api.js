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
  // Users
  // --------------------------------------------------------------------------

  async signin(email, password) {
    return this._request({
      url: `/1/users/signin`,
      method: 'put',
      data: {
        email,
        password
      }
    }).then(res => res.data)
  }

  async signup(data) {
    return this._request({
      url: `/1/users/signup`,
      method: 'post',
      data
    }).then(res => res.data)
  }

  async signout(email, password) {
    return this._request({
      url: `/1/users/signout`,
      method: 'put'
    }).then(res => res.data)
  }

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
  // Auth
  // --------------------------------------------------------------------------

  async authWithGitHub(data) {
    return this._request({
      url: `/1/auth/github`,
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

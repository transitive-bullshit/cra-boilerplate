/**
 * @class AuthManager
 */

import { computed, observable } from 'mobx'
import debug from 'lib/debug'

import API from 'lib/api'
import LocalStore from 'store/LocalStore'

import { config as githubConfig } from 'lib/auth-github'

const AUTH_STORE_KEY = 'auth'

class AuthManager {
  @observable
  auth = null

  @computed get user() {
    return this.auth.user || {}
  }

  @observable
  isBootstrapping = true

  @computed get isAuthenticated() {
    return !!this.auth
  }

  constructor() {
    LocalStore.get(AUTH_STORE_KEY)
      .then((auth) => {
        this.auth = auth
        this.isBootstrapping = false
      }, () => {
        this.isBootstrapping = false
      })
  }

  async signin(email, password) {
    debug(`AuthManager.signin "${email}"`)

    const auth = await API.signin(email, password)
    await LocalStore.set(AUTH_STORE_KEY, auth)
    this.auth = auth
  }

  async signup(opts) {
    debug(`AuthManager.signup "${opts.email}"`)

    const auth = await API.signup(opts)
    await LocalStore.set(AUTH_STORE_KEY, auth)
    this.auth = auth
  }

  async signout() {
    debug(`AuthManager.signout`)

    // await API.signout()
    await LocalStore.remove(AUTH_STORE_KEY)

    this.auth = null
  }

  async authWithGitHub(opts) {
    debug(`AuthManager.authWithGitHub`)
    const auth = await API.authWithGitHub({
      ...githubConfig,
      ...opts
    })

    await LocalStore.set(AUTH_STORE_KEY, auth)
    this.auth = auth
  }
}

export default new AuthManager()

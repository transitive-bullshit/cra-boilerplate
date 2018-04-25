/**
 * @class LoginPage
 */

import React, { Component } from 'react'

import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import LoginForm from 'components/LoginForm'

import AuthManager from 'store/AuthManager'

@observer
export default class LoginPage extends Component {
  render() {
    if (AuthManager.isAuthenticated) {
      return (
        <Redirect to='/dashboard' />
      )
    }

    return (
      <div>
        <p>Login Page</p>

        <LoginForm />
      </div>
    )
  }
}

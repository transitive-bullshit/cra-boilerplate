/**
 * @class DashboardPage
 */

import React, { Component } from 'react'

import { Button } from 'antd'

import AuthManager from 'store/AuthManager'

export default class DashboardPage extends Component {
  render() {
    return (
      <div>
        <p>Dashboard Page</p>

        <Button
          onClick={this._onClickLogout}
        >
          Logout
        </Button>
      </div>
    )
  }

  _onClickLogout = (e) => {
    AuthManager.signout()
  }
}

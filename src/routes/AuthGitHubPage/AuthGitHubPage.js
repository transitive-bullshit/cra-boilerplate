/**
 * @class AuthGitHubPage
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { message } from 'antd'
import qs from 'qs'

import debug from 'lib/debug'
import authGitHub from 'lib/auth-github'
import AuthManager from 'store/AuthManager'

@withRouter
export default class AuthGitHubPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    loading: true,
    pathname: '/'
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })

    if (!query.code || !query.state) {
      message.error('Error authenticating with GitHub')
      this.setState({ loading: false })
      return
    }

    this.setState({
      pathname: query.state
    })

    AuthManager.authWithGitHub({
      ...authGitHub.config,
      code: query.code,
      state: query.state
    })
      .then(() => {
        this.setState({ loading: false })

        message.error('Success authenticating with GitHub.')
      }, (err) => {
        this.setState({ loading: false })

        debug(err)
        message.error('Error authenticating with GitHub.')
      })
  }

  render() {
    const { loading, pathname } = this.state

    if (loading) {
      return (
        <div>
          Authenticating...
        </div>
      )
    } else {
      return (
        <Redirect to={pathname} />
      )
    }
  }
}

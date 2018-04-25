/**
 * @class AuthenticatedRoute
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { Redirect, Route } from 'react-router-dom'
import AuthManager from 'store/AuthManager'

@observer
export default class AuthenticatedRoute extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    redirect: PropTypes.string
  }

  static defaultProps = {
    redirect: '/login'
  }

  render() {
    const {
      component: Component,
      redirect,
      ...rest
    } = this.props

    return (
      <Route
        {...rest}
        render={(props) => (
          AuthManager.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: redirect,
                state: {
                  from: props.location
                }
              }}
            />
          )
        )}
      />
    )
  }
}

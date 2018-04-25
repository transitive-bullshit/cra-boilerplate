/**
 * @class HomePage
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <p>Home Page</p>

        <Link to='/login'>Login</Link>
      </div>
    )
  }
}

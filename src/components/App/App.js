/**
 * @class App
 */

import React, { Component } from 'react'
import logo from 'assets/logo.svg'
import styles from './styles.module.css'

export default class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt='logo' />

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            className={styles.link}
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

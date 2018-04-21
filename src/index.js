/**
 * React application entrypoint.
 */

// global styles
import 'styles/global.css'

// log high-level debugging info about environment
import 'lib/dump-env'

// third-party dependencies
import React from 'react'
import ReactDOM from 'react-dom'

import App from 'components/App'
import * as serviceWorker from 'lib/service-worker'

// mount react app
ReactDOM.render(<App />, document.getElementById('root'))

// initialize service worker: http://bit.ly/CRA-PWA
serviceWorker.unregister()

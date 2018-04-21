/**
 * Log high-level debugging info about the environment.
 */

import bowser from 'bowser'

import _debug from 'debug'
const debug = _debug('app')

debug('environment', {
  browser: `${bowser.name}@${bowser.version}`,
  env: process.env.NODE_ENV,
  appName: process.env.REACT_APP_NAME,
  appVersion: process.env.REACT_APP_VERSION,
  gaTrackingId: process.env.REACT_APP_GA_TRACKING_ID,
  location: window.location
})

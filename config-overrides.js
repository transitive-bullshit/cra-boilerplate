'use strict'

const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')

module.exports = (config, env) => {
  // add decorator support
  config = injectBabelPlugin('transform-decorators-legacy', config)

  // remove enforced pre-eslint validation during dev
  const eslintIndex = config.module.rules.findIndex(getEslintRule)
  if (eslintIndex >= 0) {
    config.module.rules = config.module.rules
      .slice(0, eslintIndex)
      .concat(config.module.rules.slice(eslintIndex + 1))
  }

  // allow relative imports from the top-level src directory
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules)

  return config
}

function getEslintRule (rule) {
  const { enforce, use } = rule
  return (enforce === 'pre' && use && use[0] && use[0].loader)
}

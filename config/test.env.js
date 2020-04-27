'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  // API_BASE_URL: '"http://logistics.b2bex.com"',
  API_BASE_URL: '""',
  DEBUG_MODE: true
})

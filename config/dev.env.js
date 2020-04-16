'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"http://logistics.b2bex.com"',
  DEBUG_MODE: true
})

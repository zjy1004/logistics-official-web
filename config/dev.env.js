'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASE_URL: '"http://logistics.b2bex.com"',
  API_BASE_URL: '"http://172.16.2.198:8085"', // 琳雁
  // API_BASE_URL: '"http://172.16.3.53:8085"',
  DEBUG_MODE: true
});

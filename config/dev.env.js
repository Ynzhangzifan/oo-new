'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT: '"info.e-work.tech/"', //线上接口
    API_ROOT: '"10.65.24.41/"' //本地接口
})
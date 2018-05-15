'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  S3_BUCKET_NAME: '"autenti.ca/dev-trained-models/"'
})

const express = require('express')
const app = express()

const CoreContainner = require('./coreContainner')
const core = new CoreContainner(app, 3000)

core.start()
  .catch(e => {
    console.trace()
    console.log(`Unhandled exception -> ${e}`)
  })

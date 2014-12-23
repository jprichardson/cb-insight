var Blockchain = require('../')

describe('cb-tests', function() {
  var options = {}

  beforeEach(function() {
    options.blockchain = new Blockchain('https://test-insight.bitpay.com/')
  })

  require('cb-tester')(options)
})
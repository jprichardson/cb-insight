var async = require('async')
var request = require('superagent')

function Addresses(url) {
  this.url = url
  this._limit = 10
}

// https://github.com/bitpay/insight-api#api

Addresses.prototype.summary = function(addresses, callback) { 
  // the docs/source code would suggest that it's possible to get multiple 
  // addresses within one request, but it doesn't work
  // example: https://test-insight.bitpay.com/api/addr/mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY,mv3fK2ME7g9K4HswGXs6mG92e7gRgsTsqM

  var self = this

  var makeRequest = function(addr, callback) {
    //console.log(self.url + addr)
    request.get(self.url + addr).end(function(res) {
      if (!res.ok) return callback(new Error('non-ok http status code'), res)

      var data = {
        address: addr,
        balance: res.body.balanceSat, //this could be a problem for altcoins that don't fit in a JS number (53 bits)
        totalReceived: res.body.totalReceivedSat,
        txCount: res.body.txApperances //mispelled in the API
      }

      callback(null, data)
    })
  }

  var addrs = Array.isArray(addresses) ? addresses : [ addresses ]

  var fns = addrs.map(function(addr) {
    return function(callback) { makeRequest(addr, callback) }
  })

  async.parallelLimit(fns, self._limit, function(err, results) {
    if (err) return callback(err, results)
    callback(null, Array.isArray(addresses) ? results : results[0])
  })
}

module.exports = Addresses

var url = require('url')
var Addresses = require('./addresses')

function Blockchain(apiUrl, options) {
  options = options || {}

  // some APIs have renamed this to 'address' for some reason
  options.endpoints = options.endpoints || {
    address: 'addr/'
  }

  // todo: come up with a better name
  options.multiplier = options.multiplier || 1e8 

  var urlObj = url.parse(apiUrl)
  this.url = urlObj.protocol + '//' + urlObj.hostname + '/api/'

  this.addresses = new Addresses(this.url + options.endpoints.address)
  this.addresses._multiplier = options.multiplier
}

module.exports = Blockchain

var url = require('url')
var Addresses = require('./addresses')

function Blockchain(apiUrl, options) {
  options = options || {}
  options.endpoints = options.endpoints || {
    address: 'addr/' //some APIs have renamed this to 'address' for some reason
  }

  var urlObj = url.parse(apiUrl)
  this.url = urlObj.protocol + '//' + urlObj.hostname + '/api/'

  this.addresses = new Addresses(this.url + options.endpoints.address)
}

module.exports = Blockchain

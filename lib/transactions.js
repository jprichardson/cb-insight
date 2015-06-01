var async = require('async')
var request = require('superagent')

function Transactions(url) {
  this.url = url
  this._limit = 25
}

Transactions.prototype.propagate = function(rawTxs, callback) {
  var self = this

  var makeRequest = function(txHex, callback) {
    request.post(self.url + 'tx/send').send('rawtx=' + txHex).end(function(res) {
      if (!res.ok) return callback(new Error('non-ok http status code'), res)

      var data = {
        txId: res.body.txid
      }

      callback(null, data)
    })
  }

  var txs = Array.isArray(rawTxs) ? rawTxs : [ rawTxs ]
  var fns = txs.map(function(tx) {
    return function(callback) { makeRequest(tx, callback) }
  })

  async.parallelLimit(fns, self._limit, function(err, results) {
    if (err) return callback(err, results)
    callback(null, Array.isArray(rawTxs) ? results : results[0])
  })
}

Transactions.prototype.get = function(txIds, callback) {
  var queryTxIds = [].concat(txIds)
  var uri = this.url + "rawtx/" + queryTxIds[0] //TODO: handle multiple transactions
  request.get(uri).end(function(res) {
    if (!res.ok) return callback(new Error('non-ok http status code'), res.body)

    var data = {
      txId: queryTxIds[0],
      txHex: res.body.rawtx //TODO: blockId, blockHeight
    }

    callback(null, data)
  })
}

module.exports = Transactions

var assert = require('assert')
var nock = require('nock')
var Blockchain = require('../')

describe('addresses', function() {
  describe('unspents', function() {
    describe('> when output is a fraction that when JS multiplied by 1e8 is still a fraction', function() {
      it('should correct the behavior and produce an integer', function(done) {
        var result = [{
          "address": "BETBBq8bbHnBsqA4wtgMT6egyQCDgD8z2P",
          "txid": "6cbe01568d2e9ef2a66e88800ce98ec51180c8f58d7dd564791f8e70dfbc910e",
          "vout": 1,
          "ts": 1420359729,
          "scriptPubKey": "76a9146db5e881fd6a68a9f2221612a699fd35a3225c6b88ac",
          "amount": 69.698,
          "confirmations": 741
        }]

        var fakeUrl = "http://some-bitpay-insight-api.com"
        var blockchain = new Blockchain(fakeUrl)

        nock(fakeUrl)
          .get('/api/addr/BETBBq8bbHnBsqA4wtgMT6egyQCDgD8z2P/utxo?noCache=1')
          .reply(200, result)

        blockchain.addresses.unspents('BETBBq8bbHnBsqA4wtgMT6egyQCDgD8z2P', function(err, utxos) {
          //make sure its valid (i.e. no nock problem)
          assert.equal(utxos[0].txId, "6cbe01568d2e9ef2a66e88800ce98ec51180c8f58d7dd564791f8e70dfbc910e")
          assert.equal(utxos[0].value, 6969800000)
          assert.notEqual(utxos[0].value, 6969799999.999999)

          nock.restore()
          done()
        })
      })
    })
  })
})

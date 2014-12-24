cb-insight
==========

Common Blockchain wrapper for any [Bitpay Insight API](https://github.com/bitpay/insight-api).


Common Blockchain
------------------

Common Blockchian is a concept invented by Daniel Cousens to normalize the differences between Blockchain APIs so that you can easily switch APIs if you need to.


### Canonical Example

- [cb-helloblock](https://github.com/dcousens/cb-helloblock)


### Testing Module

- [cb-tester](https://github.com/dcousens/common-blockchain)


Alternatives
------------
- [Helloblock](https://github.com/dcousens/cb-helloblock)
- [Blockr](https://github.com/weilu/cb-blockr)


API
---

### Addresses

#### summary(addresses, callback)

- **addresses**: an array of addresses or just a single address string
- **callback**: function to call upon completion. Function signature
`callback(err, results)`. If an array of addresses is passed,  `results` will be an array.
If a single address is passed, then `results` will be a single result object.

**example:**

```js
var Blockchain = require('cb-insight')
var blockchain = new Blockchain('https://test-insight.bitpay.com')

var addr = 'mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY'
blockchain.addresses.summary(addr, function(err, result) {
  console.dir(result)
})
```

**returns:**

```js
{ address: 'mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY',
  balance: 20000,
  totalReceived: 20000,
  txCount: 1 }
```


#### unspents(addresses, callback)

- **addresses**: an array of addresses or just a single address string
- **callback**: function to call upon completion. Function signature
`callback(err, utxos)`. `utxos` is an array of unspent outputs.

**example:**

```js
var Blockchain = require('cb-insight')
var blockchain = new Blockchain('https://test-insight.bitpay.com')

var addrs = [
  'mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY',
  'mv3fK2ME7g9K4HswGXs6mG92e7gRgsTsqM',
  'mvJCbQvE6DgVAECMwDprASP3NMwuU53Eie',
  'mvwvsPT2J3VPEaYmFdExFc4iBGRRK2Vdkd'
]
blockchain.addresses.unspents(addrs, function(err, utxos) {
  console.dir(utxos)
})
```

**returns:**

```js
 [ { txId: 'ffd316b0c4feb9d29c61c3734fcde0167600441e560931c8c7267a9de3d9e29a',
    confirmations: 41097,
    address: 'mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY',
    value: 20000,
    vout: 0 },
  { txId: '30d64580b02f3cbfb487c4bf58d6bcdd90caa655352620357caa14412ea7954d',
    confirmations: undefined,
    address: 'mv3fK2ME7g9K4HswGXs6mG92e7gRgsTsqM',
    value: 420000000,
    vout: 0 },
  { txId: 'f611cd3a1d676631b630600695074aab57b98ddc6982e93419438753f8f3fbda',
    confirmations: 41097,
    address: 'mv3fK2ME7g9K4HswGXs6mG92e7gRgsTsqM',
    value: 20000,
    vout: 0 },
  { txId: '41017e25bed3b740508fc10286ffd363935698bd541ac8c43d8fad52cde25220',
    confirmations: 41097,
    address: 'mvJCbQvE6DgVAECMwDprASP3NMwuU53Eie',
    value: 20000,
    vout: 0 },
  { txId: '3df7613ea58afc4c6c443cad6a8a1eaff4c5ae04e8124ec4e7204811c120101c',
    confirmations: 41098,
    address: 'mvwvsPT2J3VPEaYmFdExFc4iBGRRK2Vdkd',
    value: 20000,
    vout: 0 } ]
```



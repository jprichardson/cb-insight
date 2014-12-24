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

blockchain.addresses.summary('mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY', function(err, result) {
  console.dir(result)
})
```

returns:

```js
{ address: 'mpNDUWcDcZw1Teo3LFHvr8usNdwDLKdTaY',
  balance: 20000,
  totalReceived: 20000,
  txCount: 1 }
```



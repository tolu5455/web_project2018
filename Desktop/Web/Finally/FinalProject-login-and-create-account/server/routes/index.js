
var express = require('express');
var router = express.Router();
let { RpcClient } = require('tendermint');
const base32 = require('base32.js');
const v1 = require('../v1');
const fetch = require('node-fetch');
const { Keypair } = require('stellar-base');
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.get(`/data/:pbk`, function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware

  var name = "";
  var seq = 0;
  var balance = 0;
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${req.params.pbk}%27%22`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
      if (decodedTx.account === req.params.pbk) seq++;
      if (decodedTx.operation === "payment") {
        if (decodedTx.params.address === req.params.pbk) {
          balance += decodedTx.params.amount;
        }
        else {
          balance -= decodedTx.params.amount;
        }
      }
      if(decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "name")
        {
          name = decodedTx.params.value.toString('utf8');
        }
      }
    })
  })
  .then(() => {
    res.send({name: name, sequence: seq, balance: balance});
  })
});

router.get(`/mynewfeed/:pbk`, function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware

  var newfeed = [];
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${req.params.pbk}%27%22`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
     
      if (decodedTx.operation === "post") {
        newfeed.push(decodedTx.params.content.toString('utf8'));
      }
    })
  })
  .then(() => {
    res.send({newfeed: newfeed});
  })
});

router.get(`/followings/:pbk`, function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware

  var followings = [];
  fetch(
    `https://komodo.forest.network/tx_search?query=%22account=%27${req.params.pbk}%27%22`
  )
  .then((res) => res.json())
  .then((res) => {
    res.result.txs.map(tx => {
      var buf = new Buffer.from(tx.tx, "base64");
      var decodedTx = v1.decode(buf);
     
      if (decodedTx.operation === "update_account") {
        if(decodedTx.params.key === "followings") {
          followings = decodedTx.params.value.toString('base64');
        }
        
      }
    })
  })
  .then(() => {
    res.send({followings: followings});
  })
});

router.get('/createaccount', function(req, res, next) {

  var seq = 0
  const tx = {
    version: 1,
    account: v1.publicKey,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'create_account',
    params: { address: "GDBHGK7OI2Z6OF7DBX4NCO3UZ2VR65CYE6EIONCIFTTOYHAI7UDVMU5D"},
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === v1.publicKey) seq++;
      })
    })
    .then(() => {
      tx.sequence = seq + 1
      v1.sign(tx, v1.secretKey);
      var txHash = '0x' + v1.encode(tx).toString('hex')
      fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
    })

});

router.get('/payment', function(req, res, next) {

  var seq = 0
  const tx = {
    version: 1,
    account: v1.publicKey,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'payment',
    params: { address: "GDBHGK7OI2Z6OF7DBX4NCO3UZ2VR65CYE6EIONCIFTTOYHAI7UDVMU5D",
              amount: 100},
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === v1.publicKey) seq++;
      })
    })
    .then(() => {
      tx.sequence = seq + 1
      v1.sign(tx, v1.secretKey);
      var txHash = '0x' + v1.encode(tx).toString('hex')
      fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
    })

});

router.get("/post", function (req, res) {

  var seq = 0
  const tx = {
    version: 1,
    account: v1.publicKey,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'post',
    params: { content: Buffer.alloc(0),
      keys: []},
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === v1.publicKey) seq++;
      })
    })
    .then(() => {
      tx.params.content = Buffer.from("Hello 789999", 'utf8');
      tx.sequence = seq + 1
      v1.sign(tx, v1.secretKey);
      var txHash = '0x' + v1.encode(tx).toString('hex')
      fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash).then((res) => {})
    })

});


  router.get('/updatename', function(req, res, next) {

    var seq = 0
  const tx = {
    version: 1,
    account: v1.publicKey,
    sequence: 0,
    memo: Buffer.alloc(0),
    operation: 'update_account',
    params: { 
      key: "name",
      value: Buffer.alloc(0)
    },
  }
  fetch(
      `https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`
    )
    .then((res) => res.json())
    .then((res) => {
      res.result.txs.map(tx => {
        var buf = new Buffer.from(tx.tx, "base64");
        var decodedTx = v1.decode(buf);
        if (decodedTx.account === v1.publicKey) seq++;
      })
    })
    .then(() => {
      tx.params.value = Buffer.from("PhatNH", 'utf8');
      tx.sequence = seq + 1
      v1.sign(tx, v1.secretKey);
      var txHash = '0x' + v1.encode(tx).toString('hex')
      fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
    })
    });

    router.get('/updatepicture', function(req, res, next) {

      var base64str = v1.base64_encode('Desert.jpg');
     // console.log(base64str.toString('binary'))
      var seq = 0
    const tx = {
      version: 1,
      account: v1.publicKey,
      sequence: 0,
      memo: Buffer.alloc(0),
      operation: 'update_account',
      params: { 
        key: "picture",
        value: Buffer.alloc(0)
      },
    }
    fetch(
        `https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`
      )
      .then((res) => res.json())
      .then((res) => {
        res.result.txs.map(tx => {
          var buf = new Buffer.from(tx.tx, "base64");
          var decodedTx = v1.decode(buf);
          if (decodedTx.account === v1.publicKey) seq++;
        })
      })
      .then(() => {
        tx.params.value = Buffer.from(fs.readFileSync('Desert.jpg'),'binary');
        tx.sequence = seq + 1
        v1.sign(tx, v1.secretKey);
        var txHash = '0x' + v1.encode(tx).toString('hex')
        console.log(txHash)
        fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
      })
      });

      router.get('/updatefollowing', function(req, res, next) {

        var seq = 0
      const tx = {
        version: 1,
        account: v1.publicKey,
        sequence: 0,
        memo: Buffer.alloc(0),
        operation: 'update_account',
        params: { 
          key: "followings",
          value: Buffer.alloc(0),
        },
      }
      fetch(
          `https://komodo.forest.network/tx_search?query=%22account=%27${v1.publicKey}%27%22`
        )
        .then((res) => res.json())
        .then((res) => {
          res.result.txs.map(tx => {
            var buf = new Buffer.from(tx.tx, "base64");
            var decodedTx = v1.decode(buf);
            if (decodedTx.account === v1.publicKey) seq++;
          })
        })
        .then(() => {
          tx.params.value = Buffer.from(["GDBHGK7OI2Z6OF7DBX4NCO3UZ2VR65CYE6EIONCIFTTOYHAI7UDVMU5D",], 'base64');
          tx.sequence = seq + 1
          v1.sign(tx, v1.secretKey);
          var txHash = '0x' + v1.encode(tx).toString('hex')
          console.log(txHash)
          fetch("https://komodo.forest.network/broadcast_tx_commit?tx=" + txHash)
        })
        });
  module.exports = router;

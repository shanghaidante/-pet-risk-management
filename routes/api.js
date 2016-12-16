var express = require('express');
var router 	= express.Router();

var blockchain = require("./blockchain");

/* GET users listing. */
router.get('/contract', function(req, res, next) {
    
    console.info('api/contract called');
    
    res.status(200).json({status:"ok", address: "0x6cd0f3b9e9e3191dfef4c5f1572e4ca0cbfb4f3c", balances: "1000000", query:req.query});
});
        

/* GET users listing. */
router.get('/balance', function(req, res, next) {
    
    console.info('api/balance called');
    
    blockchain.createAccounts(function(addr) {

        console.info('blockchain.createAccounts called.');
        
        if(addr) {
            if(Array.isArray(addr)) {
                if(addr.length > 0) {
                    console.info('blockchain.getBalance is about to call for account: ' + addr[0]);
                    blockchain.getBalance(addr[0], function(balance){
                        console.info('blockchain.getBalance result: ' + balance);
                        res.status(200).json({status:"ok", address: addr[0], balances: balance, query:req.query});
                    });
                }
            }
        }
    });
});

router.get('/invest', function(req, res, next) {
    
    var amount = req.query.amount;
    console.info('api/invest called with amount', amount);
    
    blockchain.createAccounts(function(addr) {
        
        console.info('blockchain.createAccounts called.');

        blockchain.invest(amount, function(balance){
            console.info('blockchain.invest result: ' + balance);
            res.status(200).json({status:"ok", address: addr[0], balances: balance, query:req.query});
        });
     });                
});

module.exports = router;

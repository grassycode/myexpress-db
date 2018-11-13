var express = require('express');
var dbSchema = require('./../dbs/db.schema')
var dbHelper = require('./../dbs/db.helper')
var common = require('./../common/common.middleware')

var router = express.Router();

/**
 * Register user with first property
 */

router.post('/add/property',[dbHelper.addProperty], function (req, res, next) {
    res.send()
})

router.post('/add/add-unit',[common.verfiySession ,dbHelper.addunit], function(req, res, next) {
    res.json({check:'ok'}).send()
})

router.post('/add/properties', function(req, res, next) {
    res.send();
});

router.get('/{property}/units', function(req, res, next) {
    res.send();
})

router.get('/properties', function(req, res, next){
    res.send();
})

router.get('/tenants', function(req, res, next){
    res.send();
})

router.get('/value', function(req, res, next){
    res.send();
})

router.get('/expenses', function(req, res, next){
    res.send();
})

module.exports = router;
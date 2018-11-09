var express = require('express');
var dbSchema = require('./../dbs/db.schema')
var dbHelper = require('./../dbs/db.helper')
var common = require('./../common/common.middleware')

var router = express.Router();

/**
 * Register user with first property
 */

router.post('/add',[dbHelper.addProperty], function (req, res, next) {
    res.send()
})

router.post('/add-unit',[common.verfiySession ,dbHelper.addunit], function(req, res, next) {
    res.json({check:'ok'}).send()
})

router.post('/address-search', function (req, res, next) {
    var Property = dbSchema.Property;
    var property = new Property(req.body.property);
    property.findPropertyByUser(function (err, props) {
        res.json(props);
        res.send();
    });

    // console.log(t)
    // JSON.stringify(t);
    //res.jsonp(JSON.stringify(t));
});
module.exports = router;
var express = require('express');
var dbSchema = require('./../dbs/db.schema')
var dbHelper = require('./../dbs/db.helper')
var common = require('./../common/common.middleware')

var router = express.Router();
/**

 * Register user with no property

 */

router.post('/register', [dbHelper.validateUser, dbHelper.addUser], function (req, res, next) {
    res.send();
})

router.post('/login',[dbHelper.validateCredential, common.verfiySession], function(req, res, next){
    res.send();
})

router.post('/tenant/register', function (req, res, next) {
    res.send();
})

router.get()

/**

 * Register user with properties

 */

router.post('/register-properties', function (req, res, next) {
    var Property = dbSchema.Property;
    var User = dbSchema.Property;
    var user = new Property(req.body.user);
    user.save(function (err) {
        if (err) {
        }
    })
})

module.exports = router;
var express = require('express');
var dbSchema = require('./../dbs/db.schema')
var dbHelper = require('./../dbs/db.helper')

var router = express.Router();
/**

 * Register user with no property

 */

router.post('/register', [dbHelper.validateUser, dbHelper.addUser], function (req, res, next) {
    res.send();
})

router.post('/login',[dbHelper.validateCredential], function(req, res, next){
    res.send();
})

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
var express = require('express');
var dbSchema = require('./../dbs/db.schema')

var router = express.Router();

/**
 * Register user with first property
 */

router.post('register/user', function(req, res, next) {
    var Property = dbSchema.Property;
    var User = dbSchema.Property;
    var user = new Property(req.body.user);
    var property = new Property(req.body.user.property);

    user.save(function(err){
        if(err){
            next();
        }
        var User
    })
})

router.post('insert/user-prop', function(req, res, next) {
    var Property = dbSchema.Property;
    var User = dbSchema.Property;
    var user = new Property(req.body.user);
    var property = new Property(req.body.user.property);
    /* Get user by _id and update array of properties and then add property and  */
    User.findOne({_id: userName}).populate('properties').exec(function(err, userFound) {
        property.save();
        userFound.properties.push(property);
        userFound.save();
    });
})

/* GET users listing. */
router.post('/insertProperty', function (req, res, next) {
    var Property = dbSchema.Property;
    var property = new Property(req.body.property);
    property.save();
    res.send({ "status": "ok", "code": 200 });
});

router.post('/address-search', async function (req, res, next) {
    var Property = dbSchema.Property;
    var property = new Property(req.body.property);
    var t;
    await property.findPropertyByUser(function(err, props) {
        res.jsonp(props);
    })
    res.send();
    // console.log(t)
    // JSON.stringify(t);
    //res.jsonp(JSON.stringify(t));
});


module.exports = router;

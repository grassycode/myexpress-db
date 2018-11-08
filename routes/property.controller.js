var express = require('express');
var dbSchema = require('./../dbs/db.schema')

var router = express.Router();

/**
 * Register user with first property
 */

router.post('/insert', function(req, res, next) {

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

router.post('/address-search', function (req, res, next) {
var Property = dbSchema.Property; 
var property = new Property(req.body.property);
property.findPropertyByUser(function(err, props) {
res.json(props);
res.send();
});

// console.log(t)
// JSON.stringify(t);
//res.jsonp(JSON.stringify(t));
});
module.exports = router;
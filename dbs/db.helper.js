
var dbSchema = require('./../dbs/db.schema')
var Property = dbSchema.Property;
var User = dbSchema.User;
var Unit = dbSchema.Unit;

module.exports.addUser = function (req, res, next) {
    var user = new User(req.body.user);
    console.log(user);
    try {
        user.save(function (err) {
            if (err) {
                // res.json({status:"fail", code:400})
                console.log('pass2', err);
                next(err)
            } else {
                console.log('pass 3')
                res.json({
                    status: "success",
                    code: 300
                })
                next()
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.addProperty = function (req, res, next) {
    console.log(req.mySession.user)
    User.findById(req.mySession.user._id).populate('properties').
        exec(function (err, user) {
            console.log(user)
            var prop = new Property(req.body.property);
            prop.save();
            user.properties.push(prop)
            user.save();
            res.json({ status: 'success', code: 200 })
            next()
        })
}

module.exports.validateUser = function (req, res, next) {
    User.findOne({
        'email': req.body.user.email
    }).exec(function (err, users) {
        console.log(users)
        if (users) {
            res.json({
                status: 'fail',
                code: 300
            })
            try {
                throw new Error('Not valid');
            }
            catch (err) {
                console.log('mememe', err);
                next(err);
            }
        } else {
            console.log("pass1")
            next()
        }
    })
}

module.exports.validateCredential = function (req, res, next) {
    console.log(req.body.user)
    User.find({ email: req.body.user.email }).exec(function (err, users) {
        if (err) {
            next(err)
        }
        console.log(users)
        try {
            if (users && users.length === 1) {
                if (users[0].email === req.body.user.email && users[0].password === req.body.user.password) {
                    console.log('validate user')
                    req.mySession.user = users[0];
                    req.mySession.user.password = null;
                    res.locals.user = users[0];
                    res.json({ status: 'ok', code: 200 });
                    next();
                }
                else {
                    throw new Error('Not valid credential');
                }
            }
        }
        catch (err) {
            console.log('test', err);
            res.json({ status: 'fail', code: 300 });
            next(err);
        }
    })
}

module.exports.addunit = function (req, res, next) {
    console.log(req.mySession.user, req.body.data)
    User.findById(req.mySession.user._id).populate('properties').
        exec(function (err, user) {
            console.log(user)
            if(err) {
                next(err)
            }
            Property.findById(req.body.data.property_id).populate('units').exec((err, prop) => {
                if(err) {
                    next(err)
                }
                var unit = new Unit(req.body.data.unit)
                unit.save()
                prop.units.push(unit)
                prop.save()
            })
            next()
        })
}

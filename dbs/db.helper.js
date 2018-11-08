var dbSchema = require('./../dbs/db.schema')
var Property = dbSchema.Property;
var User = dbSchema.User;

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

module.exports.addProperties = function (req, res, next) {
    User.findById({
        id: req.body.data.userid
    }).populate('properties').
    exec(function (err, users) {
        console.log(users)
    })
    req.body.data.properties.array.forEach(element => {
        console.log(element)
    });

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
            try{
            throw new Error('Not valid');
            }
            catch(err){
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
    User.find({email: req.body.user.email}).exec(function (err, users) {
        if(err){
            next(err)
        }
        console.log(users)
        if (users && users.length === 1) {
            if (users[0].email === req.body.user.email && users[0].password === req.body.user.password) {
                console.log('validate user')
                req.mySession.user = users[0];
                delete req.mySession.user.password;
                res.locals.user = users[0];
                res.json({status:'ok', code:200});
                next();
            }
            else {
                res.json({status:'fail', code:300});
                next();
            }
        }
    })
}


module.exports.verfiySession= function(req, res, next) {
    console.log('session',req.mySession.user)
    next()
}
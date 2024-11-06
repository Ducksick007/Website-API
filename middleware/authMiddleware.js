const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId).then((user) => {
        if (!user) {
            return res.redirect('/index')
        }
        console.log('User logged in successfully')
        next()
    }).catch(error => {
        console.error(error)
    })
}
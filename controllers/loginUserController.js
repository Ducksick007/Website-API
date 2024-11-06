const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { email, password } = req.body;
    console.log('REQ',req.body);

    User.findOne({ email: email }).then((user) => {
        console.log('user: ',user);
        if (user) {
            bcrypt.compare(password, user.password, (error, match) => {
                if (error) {
                    console.error(error);
                    return res.redirect('/');
                }

                if (match) {
                    req.session.userId = user._id;
                    return res.redirect('/index');
                } else {
                    return res.redirect('/');
                }
            });
        } else {
            return res.redirect('/');
        }
    }).catch((error) => {
        console.error(error);
        return res.redirect('/');
    });
}

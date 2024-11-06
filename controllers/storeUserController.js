const User = require('../models/User');
module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log("User registered successfully!")
        res.redirect('/')
    }).catch((error) => {
        // console.log(error.errors)

        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/register')
        }
    })
}
// module.exports = async (req, res) => {
//     const { email, password, confirmPassword } = req.body;
//     console.log('REGIS: ',req.body);
//     try {
//         if (password !== confirmPassword) {
//             req.flash('validationErrors', 'Passwords do not match');
//             req.flash('data', req.body);
//             return res.redirect('/register');
//         }
//         const user = new User({
//             email,
//             password
//         });
//         await user.save();

//         console.log("User registered successfully!");
//         return res.redirect('/'); 
//     } catch (error) {
//         console.error(error);

//         if (error.name === 'ValidationError') {
//             const validationErrors = Object.values(error.errors).map(err => err.message);
//             req.flash('validationErrors', validationErrors);
//             req.flash('data', req.body);
//             return res.redirect('/register');
//         } else {
//             req.flash('error', 'An error occurred while registering the user.');
//             return res.redirect('/register');
//         }
//     }
// };

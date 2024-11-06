const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//mongodb conection
mongoose.connect('mongodb+srv://admin:1234@lnwproject.bznn3r3.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

//controller
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
// const fowardController = require('./controllers/forwardController')
const userController = require('./controllers/userController')
const logoutController = require('./controllers/logoutController')
const historyController = require('./controllers/historyController')

//middle ware
const redirectIfAuth = require('./middleware/redirecIifAuth')
const forwardController = require('./controllers/forwardController')



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine','ejs')
app.get('/index', indexController)
app.get('/history', historyController)
app.get('/',redirectIfAuth,loginController)
app.get('/forward',userController)
app.get('/register',redirectIfAuth,registerController)
app.post('/logout', (req, res) => {
    // Perform logout actions
    // For example, clear the session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not logout. Please try again.');
        }
        // Redirect to the login page or any other page
        res.redirect('/');
    });
});
app.post('/registrationForm', storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)


app.listen(4000, () => {
    console.log("App listening on port 4000")
})

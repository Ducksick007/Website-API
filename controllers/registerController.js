module.exports = (req, res) => {
    let username = ""
    let email = ""
    let password =""
    let data = req.flash('data')[0]
    
    if (typeof data != "undefined"){
        email = data.email
        username = data.username
        password = data.password
    }
    console.log(data);

    res.render('register' , {
        errors: req.flash('validationErrors'),
        username: username,
        email: email,
        password: password
    }) 
  }
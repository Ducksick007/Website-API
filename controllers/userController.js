const User = require('../models/User')

module.exports = async (req, res) => {
    let user_id = req.session.userId
    console.log(user_id);
    let UserData = await User.findById(user_id) //อันนี้หาด้วย id
    // let UserData = await User.find({ email: "ตัวแปรที่เก็บค่า email" }) //กรณีจะใช้ email ในการหาข้อมููลผู้ใช้
    console.log(UserData);
    res.render('forward', {
        UserData
    })
}

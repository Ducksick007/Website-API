const User = require("../models/User");
const Scans = require("../models/scans");

module.exports = async (req, res) => {

  let UserData = await User.findById(req.session.userId);
  // console.log(UserData?.username,"UserData?.username");
  let ScanData = await Scans.find({ user: UserData?.username });
  console.log(ScanData[0]?.sender?.name);
  res.render("history", {
    ScanData
  });
};

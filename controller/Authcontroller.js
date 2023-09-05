const User = require("../model/user");
const HttpError = require("../model/httpError");

const NewUserSignup = async (req, res, next) => {
  const { username, email, password, mobileNumber, profileType } = req.body;
  const isAdmin = profileType === "User" ? false : true;
  let isExistUser;
  try {
    isExistUser = await User.find({
      email: email,
      password: password,
    }).exec();
  } catch (err) {
    return next(
      new HttpError("1 Signing up failed, please try again later", 500)
    );
  }

  if (isExistUser.length) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }
  let newUser = new User({
    username,
    email,
    password,
    mobileNumber,
    isAdmin,
  });

  try {
    newUser = await newUser.save();
    res.json({ message: `${username} is register`, data: newUser._id });
  } catch (err) {
    return next(" Signing up failed, please try again later.", 500);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let finduser;
  try {
    finduser = await User.find({
      email,
      password,
    })
      .select({ _id: 1 })
      .exec();
  } catch (err) {
    return next(new HttpError("login is failed,Please try again", 500));
  }

  if (!finduser.length) {
    return next(new HttpError("signup please"), 404);
  }

  res.json({ message: "logged in", data: finduser._id.toJSON() }).status(200);
};

const logout = async (req, res) => {
  const { id } = req.body;
  let userLogout;
  try {
    userLogout = await User.findOneAndRemove({ _id: id });
  } catch (err) {
    return next(new HttpError("logouot is failed ,please try again", 500));
  }

  if (!userLogout) {
    return next(new HttpError("user is not found", 404));
  }

  res.json({ message: "user is removed", data: userLogout });
};

module.exports = { NewUserSignup, login, logout };

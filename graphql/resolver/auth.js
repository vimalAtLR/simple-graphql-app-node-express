const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = {
  createUser: async (args) => {
    try {
      // check if user already exist or not
      let findUser = await User.findOne({ email: args.userInput.email });
      if (findUser) {
        return new Error("User already exist!");
      }

      let bcrypted = await bcrypt.hash(args.userInput.password, 10);
      let newUser = new User({
        email: args.userInput.email,
        password: bcrypted,
      });
      await newUser.save();

      return newUser;
    } catch (err) {
      console.log("err in createUser : ", err);
    }
  },

  login: async ({ email, password }) => {
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return new Error("User not exist!");
        }

        let result = await bcrypt.compare(password, user.password);
        if (!result) {
            return new Error("Password is incorrect!");
        }

        let token = jwt.sign({ email: user.email, id: user._id }, "seckretofuser", { expiresIn: "1h" });

        return { _id: user._id, token: token, tokenExpiration: 1 };
    } catch (err) {
        console.log('err in login : ', err);
    }
  }
};

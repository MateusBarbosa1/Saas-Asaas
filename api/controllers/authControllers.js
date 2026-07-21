const authModel = require("../models/authModel.js");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (app, req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // criptografa a senha

    const userObject = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      plan: "",
      phoneNumber: 0,
    };
    const user = await authModel.registerUser(userObject);
    if (user.success == false) {
      return res.status(500).json(user);
    }

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
};

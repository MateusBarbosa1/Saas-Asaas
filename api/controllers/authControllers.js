const authModel = require("../models/authModel.js");

module.exports.registerUser = async (app, req, res) => {
  try {
    const data = req.body;
    const userObject = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      plan: "",
      phoneNumber: 123456789,
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

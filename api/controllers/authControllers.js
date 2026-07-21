const authModel = require("../models/authModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

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

    const token = signToken(user.data.id);
    return res.status(201).json({ ...user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
};

module.exports.loginUser = async (app, req, res) => {
  try {
    const user = await authModel.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });
    }

    const passwordMatches = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });
    }

    const token = signToken(user.id);
    return res.status(200).json({
      success: true,
      token,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
};

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
      return res.status(409).json(user);
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
module.exports.loginUser = async (app, req, res) => {
  try {
    const userObject = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await authModel.findUserEMAIL(userObject.email);
    if (user.success == false) {
      return res.status(500).json(user);
    }

    const validationPassword = bcrypt.compareSync(
      userObject.password,
      user.data.user.password,
    ); // Valida a senha

    if (validationPassword) {
      return res.status(200).json({
        success: true,
        message: "Usuario autenticado!",
        data: {
          user: {
            id: user.data.user.id,
            name: user.data.user.name,
            email: user.data.user.email,
          },
        },
      });
    }
    return res.status(401).json({
      success: false,
      message: "Email ou senha invalidos",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
};

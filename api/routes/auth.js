module.exports = (app) => {
  const authControllers = require("../controllers/authControllers.js");
  app.post("/auth/register", (req, res) => {
    authControllers.registerUser(app, req, res);
  });
  app.post("/auth/login", (req, res) => {
    authControllers.loginUser(app, req, res);
  });
};

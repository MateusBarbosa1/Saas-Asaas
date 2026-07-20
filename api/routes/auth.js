module.exports = (app) => {
  const authControllers = require("../controllers/authControllers.js");
  app.post("/auth/register", (req, res) => {
    authControllers.registerUser(app, req, res);
  });
};

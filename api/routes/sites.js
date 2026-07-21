const authMiddleware = require("../middleware/auth.js");

module.exports = (app) => {
  const sitesControllers = require("../controllers/sitesControllers.js");
  app.get("/sites", authMiddleware, sitesControllers.listSites);
  app.get("/sites/:id", authMiddleware, sitesControllers.getSite);
  app.post("/sites", authMiddleware, sitesControllers.createSite);
};

const sitesModel = require("../models/sitesModel.js");

module.exports.listSites = async (req, res) => {
  try {
    const sites = await sitesModel.listSitesByUser(req.userId);
    return res.status(200).json({ success: true, data: sites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Erro ao buscar sites" });
  }
};

module.exports.getSite = async (req, res) => {
  try {
    const site = await sitesModel.getSiteById(req.userId, req.params.id);
    if (!site) {
      return res.status(404).json({ success: false, message: "Site não encontrado" });
    }
    return res.status(200).json({ success: true, data: site });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Erro ao buscar site" });
  }
};

module.exports.createSite = async (req, res) => {
  try {
    const { name, type, pages } = req.body;
    if (!name || !Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({ success: false, message: "Dados incompletos" });
    }
    const site = await sitesModel.createSite(req.userId, { name, type, pages });
    return res.status(201).json({ success: true, data: site });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Erro ao criar site" });
  }
};

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));

const routesPath = path.join(__dirname, "routes");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    try {
      require(path.join(routesPath, file))(app);
      console.log("Loaded route:", file);
    } catch (err) {
      console.error("Erro ao carregar rota:", file);
      console.error(err);
    }
  }
});

app.listen(3000, () => console.log("server running on port 3000!"));

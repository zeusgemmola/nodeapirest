const express = require("express");
const routes = require("./routes");

const { connexion } = require("./db");

const PORT = 3000;

connexion.then(async (db) => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app, db);

  app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
  });
});

const express = require("express");
const routes = require("./routes");

const { connexion } = require("./db");

const PORT = 3000;

connexion.then(async (db) => {
  const app = express();

  routes(app, db);

  app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
  });
});

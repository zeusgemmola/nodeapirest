const express = require("express");

const { connexion } = require("./config/db");

const PORT = 3000;

connexion.then(async (db) => {
  const app = express();

  app.get("/products", async (req, res) => {
    const collection = db.collection("products");
    const list = await collection.find({}).toArray();
    res.json(list);
  });

  app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
  });
});

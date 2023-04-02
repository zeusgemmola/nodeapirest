const express = require('express');
const { connexion, db } = require('./config/db.js');

const app = express();
const PORT = 3000;

connexion(err => {
  if (err) {
    console.log('erreur de connexion à la base', err);
    process.exit(-1);
  }
  console.log('Connexion à la base établie');

  app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
  });
});

app.get('/', async (req, res) => {
  const products = await db.products.find();
  res.json(products);
});

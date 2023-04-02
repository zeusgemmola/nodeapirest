const express = require('express');

const { connexion } = require('./config/db');

const PORT = 3000;

connexion.then(async db => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
  });

});


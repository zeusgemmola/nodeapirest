const { MongoClient } = require('mongodb');
let client = null;
const dbName = 'ecommercebdd';

function connexion(cb) {
  if (client === null) {
    client = new MongoClient();
    client.connect('mongodb://127.0.0.1:20119/', err => {
      if (err) {
        client = null;
        cb(err);
      } else {
        cb();
      }
    });
  } else {
    cb();
  }
}

function bd() {
  return new Db(client, dbName);
}

function close() {
  if (client) {
    client.close();
    client = null;
  }
}

module.exports = {
  connexion,
  bd,
  close,
};

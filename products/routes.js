const { read, create, readOne } = require("./controller");

module.exports = function (app, db) {
  app.get("/products", read(db));
  app.get("/products/:id", readOne(db));
  app.post("/products", create(db));
};

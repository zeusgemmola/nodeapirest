const { read, create, readOne, update, deleteOne } = require("./controller");

module.exports = function (app, db) {
  app.get("/products", read(db));
  app.get("/products/:id", readOne(db));
  app.post("/products", create(db));
  app.put("/products/:id", update(db));
  app.delete("/products/:id", deleteOne(db));
};

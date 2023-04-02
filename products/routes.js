const { read, create } = require("./controller");

module.exports = function (app, db) {
  app.get("/products", read(db));
  app.post("/products", create(db));
};

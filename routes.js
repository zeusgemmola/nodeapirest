module.exports = function (app, db) {
  require("./products/routes")(app, db);
};

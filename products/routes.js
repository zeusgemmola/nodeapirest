const { read } = require('./controller');

module.exports = function (app, db) {
    app.get('/products', read(db) ); 
}
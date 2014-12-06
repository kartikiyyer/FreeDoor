
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/User');
var category = require('./routes/Category');
var product = require('./routes/Product');
var comment = require('./routes/Comment');
var offer = require('./routes/Offer');
var http = require('http');
var path = require('path');
var mysql = require("./util/MySQLConnection");
//mysql.createdbConnectionPool();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/users', user.createUser);
app.get('/users/:userId', user.getUser);


app.get('/category', category.getCategories);
app.post('/category', category.createCategory);
app.get('/category/:categoryId', category.getCategory);

app.post('/category/:categoryId/product', product.createProduct);
app.get('/category/:categoryId/product', product.getProducts);
app.get('/category/:categoryId/product/:productId', product.getProduct);
app.put('/category/:categoryId/product/:productId', product.updateProduct);
app.delete('/category/:categoryId/product/:productId', product.removeProduct);


app.post('/category/:categoryId/product/:productId/offer', offer.createOffer);
app.get('/category/:categoryId/product/:productId/offer', offer.getOffers);
app.get('/category/:categoryId/product/:productId/offer/:offerId', offer.getOffer);
app.put('/category/:categoryId/product/:productId/offer/:offerId', offer.updateOffer);
app.delete('/category/:categoryId/product/:productId/offer/:offerId', offer.removeOffer);

app.post('/category/:categoryId/product/:productId/offer/:offerId/comment', comment.createComment);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * New node file
 */
var mysql = require('./MySQLConnection');

function insertProduct(callback,product) {
	var connection = mysql.createdbConnection();
	connection.query("INSERT INTO product (productName, quantity, userId, expectedOffer, productDesc, productExpiryDate, isValid, categoryId, lastUpdated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",[product.productName, product.quantity, product.userId, product.expectedOffer, product.productDesc, product.productExpiryDate, product.isValid, product.categoryId, product.lastUpdated], function(error, results) {
		if(!error) {
			if(results.length !== 0) {
				console.log("Product details inserted");
			}
		} else {
			console.log("Insert Product : " + error);
		}
		
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.insertProduct = insertProduct;


function selectProductById(callback, product) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT * FROM product WHERE productId  = ?",[product.productId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Product details selected for " + product.productId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectProductById = selectProductById;

function selectProducts(callback) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT * FROM product WHERE isValid = 1", function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Product details selected");
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectProducts = selectProducts;

function editProduct(callback, product) {
	var connection = mysql.createdbConnection();
	connection.query("UPDATE product SET productName = ?, quantity = ?, expectedOffer = ?, productDesc = ?, productExpiryDate = ?, isValid = ? , categoryId = ?, lastUpdated = ? WHERE userId = ? AND productId  = ?", [product.productName, product.quantity, product.expectedOffer, product.productDesc, product.productExpiryDate, product.isValid, product.categoryId, product.lastUpdated, product.userId, product.productId],function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Product details edited for " + product.productId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.editProduct = editProduct;

function deleteProductById(callback, product) {
	var connection = mysql.createdbConnection();
	connection.query("DELETE FROM product WHERE categoryId = ? AND productId  = ?",[product.categoryId, product.productId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Product details deleted for " + product.productId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.deleteProductById = deleteProductById;

function softDeleteProductById(callback, product) {
	var connection = mysql.createdbConnection();
	connection.query("UPDATE product SET isValid = 0 AND lastUpdated = ? WHERE categoryId = ? AND productId  = ?",[product.lastUpdated, product.categoryId, product.productId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Product details unlisted for " + product.productId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.softDeleteProductById = softDeleteProductById;
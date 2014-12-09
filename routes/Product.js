/**
 * New node file
 */
var constants = require("../util/Constants");
var productdb = require("../util/Productdb");

exports.createProduct = function(req, res) {
	var product = [];
	product.productName = req.body[constants.PRODUCT_NAME];
	product.quantity = req.body[constants.QUANTITY];
	product.userId = req.body[constants.USER_ID];
	product.expectedOffer = req.body[constants.EXPECTED_OFFER];
	product.productDesc = req.body[constants.PRODUCT_DESC];
	product.productExpiryDate = req.body[constants.PRODUCT_EXPIRY_DATE];
	product.isValid = req.body[constants.IS_VALID];
	product.categoryId = req.params.categoryId;
	var date = new Date();
	product.lastUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
	//product.lastUpdated = req.body[constants.LAST_UPDATED];
	if(product.productName != "") {
		productdb.insertProduct(function(results, error) {
			if(error == null) {
				product.productId = results.insertId;
				res.send({productId: product.productId, productName: product.productName, quantity: product.quantity, userId: product.userId, expectedOffer: product.expectedOffer, productDesc: product.productDesc, productExpiryDate: product.productExpiryDate, isValid: product.isValid, categoryId: product.categoryId, lastUpdated: product.lastUpdated});
			} else {
				// TODO: Need to implement status codes
				res.status(500).send({error : error});
			}
		}, product);
	}  else {
		res.status(400).send("Missing fields!!!");
	}
};


exports.getProduct = function(req, res) {
	var product = [];
	product.productId = req.params.productId;
	productdb.selectProductById(function(results, error) {
		if(error == null) {
			if(results.length > 0) {
				res.send(results[0]);
			} else {
				res.send({error : "No product found!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	}, product);
};


exports.getProducts = function(req, res) {
	productdb.selectProducts(function(results, error) {
		if(error == null) {
			if(results.length > 0) {
				res.send(results);
			} else {
				res.send({msg : "No product found!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	});
};

exports.updateProduct = function(req, res) {
	var product = [];
	product.productName = req.body[constants.PRODUCT_NAME];
	product.productId = req.params.productId;
	product.quantity = req.body[constants.QUANTITY];
	product.userId = req.body[constants.USER_ID];
	product.expectedOffer = req.body[constants.EXPECTED_OFFER];
	product.productDesc = req.body[constants.PRODUCT_DESC];
	product.productExpiryDate = req.body[constants.PRODUCT_EXPIRY_DATE];
	product.isValid = req.body[constants.IS_VALID];
	product.categoryId = req.params.categoryId;
	var date = new Date();
	product.lastUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
	//product.lastUpdated = req.body[constants.LAST_UPDATED];
	if(product.productName != "") {
		productdb.editProduct(function(results, error) {
			if(error == null) {
				if(results.affectedRows > 0 ) {
					//product.productId = results.insertId;
					res.send({productId: product.productId, productName: product.productName, quantity: product.quantity, userId: product.userId, expectedOffer: product.expectedOffer, productDesc: product.productDesc, productExpiryDate: product.productExpiryDate, isValid: product.isValid, categoryId: product.categoryId, lastUpdated: product.lastUpdated});
				} else {
					res.send({error : "No product to edit!!!"});
				}
			} else {
				// TODO: Need to implement status codes
				res.status(500).send({error : error});
			}
		}, product);
	} else {
		res.status(400).send("Missing fields!!!");
	}
};

exports.removeProduct = function(req, res) {
	var product = [];
	product.productId = req.params.productId;
	product.categoryId = req.params.categoryId
	var date = new Date();
	product.lastUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
	productdb.softDeleteProductById(function(results, error) {
		if(error == null) {
			console.log(results);
			if(results.affectedRows > 0) {
				res.send();
			} else {
				res.send({error : "No product to un-list!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	}, product);
};
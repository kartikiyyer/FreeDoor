/**
 * New node file
 */
var mysql = require('./MySQLConnection');

function insertOffer(callback,offer) {
	var connection = mysql.createdbConnection();
	connection.query("INSERT INTO offer (buyingQty, offeredDetails,  buyerStatus, sellerStatus, offerExpiry, productId, buyerId, lastModified) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",[offer.buyingQty , offer.offeredDetails ,  offer.buyerStatus ,  offer.sellerStatus, offer.offerExpiry, offer.productId, offer.buyerId, offer.lastModified], function(error, results) {
		if(!error) {
			if(results.length !== 0) {
				console.log("Offer details inserted");
			}
		} else {
			console.log("Insert Offer : " + error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.insertOffer = insertOffer;

function editOffer(callback, offer) {
	var connection = mysql.createdbConnection();
	connection.query("UPDATE offer SET buyingQty = ?, offeredDetails = ?, buyerStatus = ?, sellerStatus = ?, offerExpiry = ?, productId = ? , lastModified = ? WHERE buyerId = ? AND offerId  = ?", [offer.buyingQty, offer.offeredDetails, offer.buyerStatus, offer.sellerStatus, offer.offerExpiry, offer.productId, offer.lastModified, offer.buyerId, offer.offerId],function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Offer details edited for " + offer.offerId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.editOffer = editOffer;

function selectOfferById(callback, offer) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT offerId, buyingQty, offeredDetails, buyerStatus, sellerStatus, offerExpiry, productId, buyerId, lastModified FROM offer WHERE offerId  = ?",[offer.offerId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Offer details selected for " + offer.offerId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectOfferById = selectOfferById;


function selectOffers(callback, offer) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT * FROM offer", function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Offer details selected");
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectOffers = selectOffers;



function deleteOfferById(callback, offer) {
	var connection = mysql.createdbConnection();
	connection.query("DELETE FROM offer WHERE offerId  = ?",[offer.offerId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Offer details deleted for " + offer.offerId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.deleteOfferById = deleteOfferById;

/**
 * New node file
 */

var mysql = require('./MySQLConnection');

function insertOfferHistory(callback,offerHistory) {
	var connection = mysql.createdbConnection();
	connection.query("INSERT INTO offer_history (modified, lastModified, offerId) VALUES(?, ?, ?)",[offerHistory.modified, offerHistory.lastModified, offerHistory.offerId], function(error, results) {
		if(!error) {
			if(results.length !== 0) {
				console.log("Offer details details inserted");
			}
		} else {
			console.log("Insert Offer Details : " + error);
		}
		
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.insertOfferHistory = insertOfferHistory;

/*function selectCategories(callback) {
	var query = "SELECT categoryId, categoryName FROM category";
	var connection = mysql.createdbConnection();
	connection.query(query, function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Category details selected");
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectCategories = selectCategories;


function selectCategoryById(callback, category) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT categoryId, categoryName FROM category WHERE categoryId  = ?",[category.categoryId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Category details selected for " + category.categoryId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectCategoryById = selectCategoryById;
*/


function selectLatestOfferHistoryById(callback, offer) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT modified FROM offer_history WHERE offerId  = ? ORDER BY lastModified DESC LIMIT 1",[offer.offerId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Offer History details selected for offer " + offer.offerId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectLatestOfferHistoryById = selectLatestOfferHistoryById;

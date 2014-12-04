/**
 * New node file
 */

var mysql = require('./MySQLConnection');

function insertCategory(callback,category) {
	var connection = mysql.createdbConnection();
	connection.query("INSERT INTO category (categoryName) VALUES(?)",[category.categoryName], function(error, results) {
		if(!error) {
			if(results.length !== 0) {
				console.log("Category details inserted");
			}
		} else {
			console.log("Insert Category : " + error);
		}
		
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.insertCategory = insertCategory;

function selectCategories(callback) {
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
	connection.query("SELECT categoryName FROM category WHERE categoryId  = ?",[category.categoryId], function(error, results) {
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




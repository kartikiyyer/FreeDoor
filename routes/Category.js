/**
 * New node file
 */
var constants = require("../util/Constants");
var categorydb = require("../util/Categorydb");

exports.createCategory = function(req, res) {
	var category = [];
	category.categoryName = req.body.categoryName;
	if(category.categoryName != "") {
		categorydb.insertCategory(function(results, error) {
			if(error == null) {
				category.categoryId = results.insertId;
				res.send({categoryName: category.categoryName, categoryId:category.categoryId});
			} else {
				// TODO: Need to implement status codes
				res.send({error : error});
			}
		}, category);
	}
};

exports.getCategories = function(req, res) {
	categorydb.selectCategories(function(results, error) {
		if(error == null) {
			res.send({categories: results});
		} else {
			// TODO: Need to implement status codes
			res.send({error : error});
		}
	});
};


exports.getCategory = function(req, res) {
	var category = [];
	category.categoryId = req.body[constants.CATEGORY_ID]
	categorydb.selectCategoryById(function(results, error) {
		if(error == null) {
			res.send({categories: results});
		} else {
			// TODO: Need to implement status codes
			res.send({error : error});
		}
	}, category);
};
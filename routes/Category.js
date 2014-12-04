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
				res.status(500).send({error : error});
			}
		}, category);
	} else {
		res.status(400).send("Missing fields!!!");
	}
};

exports.getCategories = function(req, res) {
	categorydb.selectCategories(function(results, error) {
		if(error == null) {
			res.send({categories: results});
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	});
};


exports.getCategory = function(req, res) {
	var category = [];
	category.categoryId = req.params.categoryId;
	categorydb.selectCategoryById(function(results, error) {
		if(error == null) {
			if(results.length > 0) {
				//category.categoryName = results[0].categoryName;
				res.send(results[0]);
			} else {
				res.send({error : "No category found!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	}, category);
};
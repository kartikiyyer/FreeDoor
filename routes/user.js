
/*
 * GET users listing.
 */

var constants = require("../util/Constants");
var userdb = require("../util/Userdb");

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.createUser = function(req, res) {
	var user = [];
	user.firstName = req.body[constants.FIRST_NAME];
	user.lastName = req.body[constants.LAST_NAME];
	user.email = req.body[constants.EMAIL];
	user.mobile = req.body[constants.MOBILE];
	if(user.firstName != "" && user.lastName != "" && user.email != "" && user.mobile != "" && !isNaN(user.mobile)) {
		userdb.checkUserByEmail(function(results, error) {
			if(error === null) {
				if(results.length > 0) {
					res.send({error: "Duplicate user!!!"});
				} else {
					userdb.insertUser(function(results, error) {
						if(error === null) {
							user.userId = results.insertId;
							//console.log(user);
							res.send({firstName: user.firstName, lastName: user.lastName, emaild: user.email, mobile: user.mobile, userId: user.userId});
						} else {
							res.send({error: error});
						}
					}, user);
				}
			} else {
				res.status(500).send({error : error});
			}
		}, user);
	} else {
		res.status(400).send("Missing fields!!!");
	}
};


exports.getUser = function(req, res) {
	var user = [];
	user.userId = req.params.userId;
	
	if(userId !== "") {
		userdb.selectUserById(function(results, error) {
			if(error === null) {
				if(results.length > 0) {
					user.firstName = results[0].firstName;
					user.lastName = results[0].lastName;
					user.email = results[0].emaild;
					user.mobile = results[0].mobile;
					res.send({firstName: user.firstName, lastName: user.lastName, emaild: user.email, mobile: user.mobile, userId: user.userId});
				} else {
					res.send({error: "No user present with userId: " + user.userId});
				}
			} else {
				res.status(500).send({error : error});
			}
		}, user);
	}
	
	
};



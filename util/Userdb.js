/**
 * New node file
 */
var mysql = require('./MySQLConnection');

function insertUser(callback,user) {
	var connection = mysql.createdbConnection();
	connection.query("INSERT INTO user (firstName, lastName,  emaild, mobile) VALUES(?, ?, ?, ?)",[user.firstName , user.lastName ,  user.email ,  user.mobile ], function(error, results) {
		if(!error) {
			if(results.length !== 0) {
				console.log("User details inserted");
			}
		} else {
			console.log("Insert User : " + error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.insertUser = insertUser;


function checkUserByEmail(callback, user) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT userId FROM user WHERE emaild  = ?",[user.email], function(error, results) {
		if(!error) {
			console.log(results);
			if(results.length !== 0) {
				console.log("User details is present for " + user.email);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.checkUserByEmail = checkUserByEmail;


function selectUserById(callback, user) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT userId, firstName, lastName, emaild, mobile FROM user WHERE userId  = ?",[user.userId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("User details selected for " + user.userId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectUserById = selectUserById;





function selectUserByEmail(callback, user) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT userId, firstName, lastName, emaild, mobile FROM user WHERE emaild  = ?",[user.email], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("User details selected for " + user.email);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectUserByEmail = selectUserByEmail;



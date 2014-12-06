/**
 * New node file
 */
var mysql = require('./MySQLConnection');

function insertComment(callback,comment) {
	var connection = mysql.createdbConnection();
	connection.query("INSERT INTO comment (commentDesc, userId, offerId, lastUpdated) VALUES(?, ?, ?, ?)",[comment.comment, comment.userId, comment.offerId, comment.lastUpdated], function(error, results) {
		if(!error) {
			if(results.length !== 0) {
				console.log("Comment details inserted");
			}
		} else {
			console.log("Insert Comment : " + error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.insertComment = insertComment;


function selectCommentById(callback, comment) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT commentId, commentDesc, lastUpdated, offerId, userId FROM comment WHERE commentId  = ?",[comment.commentId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Comment details selected for " + comment.commentId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectCommentById = selectCommentById;

function selectCommentByOfferId(callback, offer) {
	var connection = mysql.createdbConnection();
	connection.query("SELECT commentId, commentDesc, lastUpdated, offerId, userId FROM comment WHERE offerId  = ?",[offer.offerId], function(error, results) {
		if(!error) {
			//console.log(results);
			if(results.length !== 0) {
				console.log("Comment details selected for offer " + offer.offerId);
			}
		} else {
			console.log(error);
		}
		callback(results, error);
	});
	mysql.closedbConnection(connection);
}

exports.selectCommentByOfferId = selectCommentByOfferId;



/*


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

exports.selectUserByEmail = selectUserByEmail;*/



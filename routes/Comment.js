/**
 * New node file
 */

var constants = require("../util/Constants");
var commentdb = require("../util/Commentdb");

exports.createComment = function(req, res) {
	var comment = [];
	comment.commentDesc = req.body[constants.COMMENT_DESC];
	comment.userId = req.body[constants.USER_ID];
	comment.offerId = req.params.offerId;
	//comment.lastUpdated = req.body[constants.LAST_UPDATED];
	var date = new Date();
	comment.lastUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
	
	if(comment.commentDesc != "") {
		commentdb.insertComment(function(results, error) {
			if(error == null) {
				comment.commentId = results.insertId;
				res.send({commentDesc: comment.commentDesc, userId:comment.userId, offerId:comment.offerId,lastUpdated: comment.lastUpdated});
			} else {
				// TODO: Need to implement status codes
				res.status(500).send({error : error});
			}
		}, comment);
	} else {
		res.status(400).send("Missing fields!!!");
	}
};
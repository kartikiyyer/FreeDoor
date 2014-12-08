/**
 * New node file
 */
var expect = require("chai").expect,
comment = require('../util/Commentdb');

describe('insertComment',function(){
	it('should create comment', function(done){
		var comm=[];
		comm.commentDesc = "I already got this one!!";
		comm.userId = 1;
		comm.offerId = 6;
		var date = new Date();
		comm.lastUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
		
		console.log("----Test 1:Create Comment----\n"); 
		comment.insertComment(function(results,err){
			if (err) return done(err);

			console.log("Comment Id of record inserted:: "+results.insertId+"\n");
			done();
			console.log("----End of TestCase1----");
		},comm);

	})
});

describe('selectCommentById',function(){
	it('shows comment for a specific Id', function(done){
		var comm=[];
		comm.commentId=8;
		console.log("----Test 2:Select Comment By Id----\n"); 
		comment.selectCommentById(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			expect(results[0]).to.have.a.property("commentId",comm.commentId);
			done();
			console.log("----End of TestCase2----");
		},comm);

	})
});

describe('selectCommentByOfferId',function(){
	it('shows all the comments for offer mentioned', function(done){

		var comm=[];
		comm.offerId=6;

		console.log("----Test 3:Select Comment by Offer Id----\n"); 
		comment.selectCommentByOfferId(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			expect(results[0]).to.have.a.property("offerId",comm.offerId);
			done();
			console.log("----End of TestCase3----");
		},comm);

	})
});
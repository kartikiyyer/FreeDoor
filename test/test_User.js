/**
 * New node file
 */

var expect = require("chai").expect,
 
 user = require('../util/Userdb');
 

 describe('InsertUser',function(){
 	it('should create User', function(done){
 		var member=[];
 			member.firstName='Tarun';
 			member.lastName= 'joshi';
 			member.email= 'tarunjoshi2604@gmail.com';
 			member.mobile = '4084293020';
 			console.log("----Test 3:Create User----\n"); 
 		user.insertUser(function(results,err){
 			if (err) return done(err);
 			console.log(results+"\n");
 	       	 done();
 	    	console.log("----End of Test3----");
 		},member);
 		 
 	})
 });
 
 describe('UserDbSelectByEmailId', function(){
	   it('should exist', function(done){
	      //var req = {body:{}{}};
	     // var userId="4";
		   var member=[];
		  member.email = "tarunjoshi2603@gmail.com";
	   // var movieId = "4"
	     /* var results = user.selectRole(userId);*/
		/*   var results = user.checkUserByEmail();
	      expect(results).to.have.a.property("ROLE_ID","USER");
	      console.log(results);
	      console.log("----Test 2:Select user details----\n");*/
	      user.checkUserByEmail(function(results,err) {
	    	  if (err) return done(err);
	    	  console.log(results+"\n");
	    	  expect(results[0]).to.have.a.property("userId",36);
	    	  done();
	    	  console.log("----End of Test2----");
	      },member);
	     
	     })
	 
	});
 
 describe('SelectUserByEmail', function(){
	   it('should exist', function(done){
	      //var req = {body:{}{}};
	     // var userId="4";
		   var member=[];
		  member.email = "tarunjoshi2603@gmail.com";
	   // var movieId = "4"
	     /* var results = user.selectRole(userId);*/
		/*   var results = user.checkUserByEmail();
	      expect(results).to.have.a.property("ROLE_ID","USER");
	      console.log(results);
	      console.log("----Test 2:Select user details----\n");*/
	      user.selectUserByEmail(function(results,err) {
	    	  if (err) return done(err);
	    	  console.log(results+"\n");
	    	  expect(results[0]).to.have.a.property("userId",36);
	    	  done();
	    	  console.log("----End of Test2----");
	      },member);
	     
	     })
	 
	});
 
 
 describe('SelectUserByEmail', function(){
	   it('should exist', function(done){
	      //var req = {body:{}{}};
	     // var userId="4";
		   var member=[];
		  member.userId = "36";
	   // var movieId = "4"
	     /* var results = user.selectRole(userId);*/
		/*   var results = user.checkUserByEmail();
	      expect(results).to.have.a.property("ROLE_ID","USER");
	      console.log(results);
	      console.log("----Test 2:Select user details----\n");*/
	      user.selectUserById(function(results,err) {
	    	  if (err) return done(err);
	    	  console.log(results+"\n");
	    	  expect(results[0]).to.have.a.property("firstName","Tarun");
	    	  done();
	    	  console.log("----End of Test2----");
	      },member);
	     
	     })
	 
	});
 
 
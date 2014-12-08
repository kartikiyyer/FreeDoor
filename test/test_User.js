/**
 * New node file
 */

var expect = require("chai").expect,
 
 user = require('../util/Userdb');
 

 describe('InsertUser',function(){
 	it('should create User', function(done){
 		var member=[];
 			member.firstName='Richard';
 			member.lastName= 'Sin';
 			member.email= 'richard.sin@sjsu.edu';
 			member.mobile = '8585555858';
 			console.log("----Test 1:Create User----\n"); 
 		user.insertUser(function(results,err){
 			if (err) return done(err);
 			console.log("UserId of user inserted:: "+results.insertId+"\n");
 	       	 done();
 	    	console.log("----End of Test1----");
 		},member);
 		 
 	})
 });
 
 describe('checkUserByEmail', function(){
	   it('should exist', function(done){
		  var member=[];
		  member.email = "john.gash@sjsu.edu";
		 
	      console.log("----Test 2:Check User By EmailId----\n");
	      user.checkUserByEmail(function(results,err) {
	    	  if (err) return done(err);
	    	  expect(results[0]).to.have.a.property("userId",50);
	    	 
	    	  done();
	    	  console.log("----End of Test2----");
	      },member);
	     
	     })
	 
	});
 
	 describe('selectUserByEmail', function(){
		   it('should exist', function(done){
			  var member=[];
			  member.email = "richard.sin@sjsu.edu";
			 
		      console.log("----Test 3:Check User By EmailId----\n");
		      user.selectUserByEmail(function(results,err) {
		    	  if (err) return done(err);
		    	  console.log(JSON.stringify(results));
		    	  expect(results[0]).to.have.a.property("emaild",member.email);
		    	  done();
		    	  console.log("----End of Test3----");
		      },member);
		     
		     })
		 
		});
	 
	 describe('selectUserById', function(){
		   it('should exist', function(done){
			  var member=[];
			  member.userId = 38;
			 
		      console.log("----Test 4:Select User By UserId----\n");
		      user.selectUserById(function(results,err) {
		    	  if (err) return done(err);
		    	  console.log("First Name:: "+results[0].firstName+"\n");
		    	  console.log("Last Name:: "+results[0].lastName+"\n");
		    	  console.log("Email Id:: "+results[0].emaild+"\n");
		    	  console.log("Mobile:: "+results[0].mobile+"\n");
		    	  console.log(results+"\n");
		    	  expect(results[0]).to.have.a.property("userId",member.userId);
		    	  done();
		    	  console.log("----End of Test4----");
		      },member);
		     
		     })
		 
		});
 
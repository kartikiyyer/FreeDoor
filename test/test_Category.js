/**
 * New node file
 */
var expect = require("chai").expect,
category = require('../util/Categorydb');

describe('InsertCategory',function(){
 	it('should create category', function(done){
 		var cate=[];
 		 cate.categoryName="abcdef"
 			console.log("----Test 3:Create Category----\n"); 
 		category.insertCategory(function(results,err){
 			if (err) return done(err);
 			// expect(results[0]).to.have.a.property("categoryId");
 			console.log(results+"\n");
 	       	 done();
 	    	console.log("----Create Category----");
 		},cate);
 		 
 	})
 });
 
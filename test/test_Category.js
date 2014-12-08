/**
 * New node file
 */
var expect = require("chai").expect,
category = require('../util/Categorydb');

describe('InsertCategory',function(){
	it('should create category', function(done){
		var cate=[];
		cate.categoryName="Books";
		console.log("----Test 1:Create Category----\n"); 
		category.insertCategory(function(results,err){
			if (err) return done(err);

			console.log("Category Id of record inserted:: "+results.insertId+"\n");
			done();
			console.log("----End of TestCase1----");
		},cate);

	})
});

describe('selectCategories',function(){
	it('shows all the categories', function(done){

		console.log("----Test 2:Select Categories----\n"); 
		category.selectCategories(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			done();
			console.log("----End of TestCase2----");
		});

	})
});

describe('selectCategoryById',function(){
	it('shows category by Id', function(done){

		var cat=[];
		cat.categoryId=18;

		console.log("----Test 3:Select Category by Id----\n"); 
		category.selectCategoryById(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			expect(results[0]).to.have.a.property("categoryId",18);
			done();
			console.log("----End of TestCase3----");
		},cat);

	})
});
/**
 * New node file
 */
var expect = require("chai").expect,
product = require('../util/Productdb');
/*
describe('InsertProduct',function(){
	it('should create Product', function(done){
		var prod=[];
		prod.productName = "Used Iphone 5s";
		prod.quantity="1"; 
		prod.userId="52";
		prod.expectedOffer="500 or relevant exchange";
		prod.productDesc= "32GB Unlocked Iphone 5s"; 
		prod.productExpiryDate="2015-05-05";
		prod.isValid=1;
		prod.categoryId="15";
		prod.lastUpdated="2014-12-05 13:07:17";
		console.log("----Test 1:Create Product----\n"); 
		product.insertProduct(function(results,err){
			if (err) return done(err);
			console.log("Product Id of Inserted Record:: "+results.insertId+"\n");
			done();
			console.log("----End of Test1----");
		},prod);

	})
});

describe('selectProductById', function(){
	it('should exist', function(done){
		var prod=[];
		prod.productId = 8;

		console.log("----Test 2:Select Product By ProductId----\n");
		product.selectProductById(function(results,err) {
			if (err) return done(err);
			console.log("Product Name:: "+results[0].productName+"\n");
			console.log("Product Quantity:: "+results[0].quantity+"\n");
			console.log("Expected Offer:: "+results[0].expectedOffer+"\n");
			console.log("Product Description:: "+results[0].productDesc+"\n");
			console.log("Product Expiry:: "+results[0].productExpiryDate+"\n");
			console.log("Category Id:: "+results[0].categoryId+"\n");
			//console.log(results+"\n");
			expect(results[0]).to.have.a.property("productId",prod.productId);
			done();
			console.log("----End of Test2----");
		},prod);

	})

});

describe('selectProducts', function(){
	it('should exist', function(done){

		console.log("----Test 3:Select Products By Validity----\n");
		product.selectProducts(function(results,err) {
			if (err) return done(err);
			for(var i=0;i<results.length;i++){
				console.log("Product Name:: "+results[i].productName+"\n");
				console.log("Product Quantity:: "+results[i].quantity+"\n");
				console.log("Expected Offer:: "+results[i].expectedOffer+"\n");
				console.log("Product Description:: "+results[i].productDesc+"\n");
				console.log("Product Expiry:: "+results[i].productExpiryDate+"\n");
				console.log("Category Id:: "+results[i].categoryId+"\n");
			}
			done();
			console.log("----End of Test3----");
		});

	})

});
*/
describe('editProduct', function(){
	it('should exist', function(done){

		var prod=[];
		prod.productName = "Used Iphone 5s";
		prod.quantity="1"; 
		prod.expectedOffer="450";
		prod.productDesc= "64GB Unlocked Iphone 5s"; 
		prod.productExpiryDate="2015-05-05";
		prod.isValid=1;
		prod.categoryId="15";
		prod.lastUpdated="2014-12-05 13:07:17";
		prod.userId="52";
		prod.productId=10;
		console.log("----Test 4:Edit Products----\n");
		product.editProduct(function(results,err) {
			if (err) return done(err);
			console.log("Successful updation for ProductId:: "+prod.productId);
			done();
			console.log("----End of Test4----");
		},prod);

	})

});

describe('deleteProductById', function(){
	it('should exist', function(done){

		var prod=[];
		prod.productId=8;
		console.log("----Test 5: Delete Product by Id----\n");
		product.deleteProductById(function(results,err) {
			if (err) return done(err);
			console.log("Successful deletion for ProductId:: "+prod.productId);
			//expect(results[0]).to.have.a.property("productId",6);
			done();
			console.log("----End of Test5----");
		},prod);

	})

});

describe('softDeleteProductById', function(){
	it('should exist', function(done){
		var prod=[];
		prod.productId=6;
		var date = new Date();
		prod.lastUpdated = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
		console.log("----Test 6: Soft Delete Product by Id----\n");
		product.softDeleteProductById(function(results,err) {
			if (err) return done(err);
			console.log("Successful deletion for ProductId:: "+prod.productId);
			//expect(results[0]).to.have.a.property("productId",6);
			done();
			console.log("----End of Test6----");
		},prod);

	})

});
/**
 * New node file
 */
var expect = require("chai").expect,
product = require('../util/Productdb');

 describe('InsertProduct',function(){
 	it('should create User', function(done){
 		var prod=[];
 		prod.productName = "abcd";
 		prod.quantity="1"; 
 		prod.userId="36";
 		prod.expectedOffer="xyz";
 		prod.productDesc= "xyz"; 
 		prod.productExpiryDate="2014-05-05";
 		prod.isValid=1;
 		prod.categoryId="15";
 		prod.lastUpdated="2014-05-05 13:07:17";
 			console.log("----Test 3:Create User----\n"); 
 			product.insertProduct(function(results,err){
 			if (err) return done(err);
 			console.log(results[0]+"\n");
 			 expect(results[0]).to.have.a.property("productId");
 			done();
 	    	console.log("----End of Test3----");
 		},prod);
 		 
 	})
 });
 
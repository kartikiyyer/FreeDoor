/**
 * New node file
 		var ofr=[];
		ofr.buyingQty = 6;
		ofr.offeredDetails = "Selling off 6 ";
		ofr.buyerStatus = "OPEN";
		ofr.sellerStatus = "OPEN";
		ofr.offerExpiry = "2015-05-05";
		ofr.productId = 6;
		ofr.buyerId = 38;
		ofr.comments = "No Comments!!";		
 
 
 */
var expect = require("chai").expect,
offer = require('../util/Offerdb');
offerHistorydb = require('../util/OfferHistorydb');

describe('insertOffer',function(){
	it('should create Offer', function(done){
		var ofr=[];
		ofr.buyingQty = 1;
		ofr.offeredDetails = "Buying bed for dining table";
		ofr.buyerStatus = "OPEN";
		ofr.sellerStatus = "OPEN";
		ofr.offerExpiry = "2015-05-05";
		ofr.productId = 11;
		ofr.buyerId = 1;
		ofr.comments = "Please respond soon";
		var date = new Date();
		ofr.lastModified = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
		
		console.log("----Test 1:Create Offer----\n"); 
		offer.insertOffer(function(results,err){
			if (err) return done(err);

			console.log("Offer Id of record inserted:: "+results.insertId+"\n");
			done();
			console.log("----End of TestCase1----");
		},ofr);

	})
});

describe('editOffer',function(){
	it('should edit Offer', function(done){
		var ofr=[];
		ofr.buyingQty = 1;
		ofr.offeredDetails = "Bed for dining table";
		ofr.buyerStatus = "OPEN";
		ofr.sellerStatus = "OPEN";
		ofr.offerExpiry = "2015-01-05";
		ofr.productId =11;
		ofr.buyerId = 1;
		ofr.comments = "If interested please contact the sellar";
		var date = new Date();
		ofr.lastModified = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
		ofr.offerId=1;
		console.log("----Test 2:Update Offer----\n"); 
		offer.selectOfferById(function(results1, error) {
			if(error == null) {
				if(results1.length > 0) {
					if(results1[0].buyingQty != ofr.buyingQty)
						lastEvent = lastEvent + "oldValue:"+results1[0].buyingQty+",newValue:" + ofr.buyingQty;
					if(results1[0].offeredDetails != ofr.offeredDetails)
						lastEvent = lastEvent + "oldValue:"+results1[0].offeredDetails +",newValue:" + ofr.offeredDetails;
					if(results1[0].buyerStatus != ofr.buyerStatus)
						lastEvent = lastEvent + "oldValue:"+results1[0].buyerStatus +",newValue:" + ofr.buyerStatus;
					if(results1[0].sellerStatus != ofr.sellerStatus)
						lastEvent = lastEvent + "oldValue:"+results1[0].sellerStatus +",newValue:" + ofr.sellerStatus;
					var oldOfferExpiry = new Date(results1[0].offerExpiry);
					var newOfferExpiry = new Date(ofr.offerExpiry);

					if(oldOfferExpiry.getDate() != (newOfferExpiry.getDate() + 1) || oldOfferExpiry.getMonth() != newOfferExpiry.getMonth() || oldOfferExpiry.getFullYear() != newOfferExpiry.getFullYear()) 
						lastEvent = lastEvent + "oldValue:"+ results1[0].offerExpiry +",newValue:" + ofr.offerExpiry;
					if(results1[0].productId != ofr.productId)
						lastEvent = lastEvent + "oldValue:"+results1[0].productId +",newValue:" + ofr.productId;
					if(results1[0].buyerId != ofr.buyerId)
						lastEvent = lastEvent + "oldValue:"+results1[0].buyerId +",newValue:" + ofr.buyerId;
					if(results1[0].offerId != ofr.offerId)
						lastEvent = lastEvent + "oldValue:"+results1[0].offerId +",newValue:" + ofr.offerId;
					
					if(lastEvent != "") {
						var offerHistory = [];
						offerHistory.modified = lastEvent;
						var date = new Date();
						offerHistory.lastModified = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
						offerHistory.offerId = ofr.offerId;
						offerHistorydb.insertOfferHistory(function(results, error) {
						},offerHistory)
					}
					offerdb.editOffer(function(results, error) {
						if(error === null) {
							if(results.affectedRows > 0 ) {
								console.log("Record successfully updated for offer id:"+ofr.offerId)
							}
						} else {
							res.send({error: error});
						}
						done();
						console.log("----End of TestCase2----");
					}, ofr);
				}
			}
			
		},ofr);
	})
});



describe('selectOfferById',function(){
	it('shows offer for a specific Id', function(done){
		var ofr=[];
		ofr.offerId=3;
		console.log("----Test 3:Select Offer By Id----\n"); 
		offer.selectOfferById(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			expect(results[0]).to.have.a.property("offerId",ofr.offerId);
			done();
			console.log("----End of TestCase3----");
		},ofr);

	})
});

describe('selectOffers',function(){
	it('shows all the offers', function(done){

		console.log("----Test 4:Show Offers----\n"); 
		offer.selectOffers(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			done();
			console.log("----End of TestCase4----");
		});

	})
});

describe('deleteOfferById', function(){
	it('should exist', function(done){

		var ofr=[];
		ofr.offerId=2;
		console.log("----Test 5: Delete Offer by Id----\n");
		offer.deleteOfferById(function(results,err) {
			if (err) return done(err);
			console.log("Successful deletion for OfferId:: "+ofr.offerId);
			done();
			console.log("----End of Test5----");
		},ofr);

	})

});

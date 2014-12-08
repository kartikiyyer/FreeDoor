/**
 * New node file
 */
/**
 * New node file
 */
var expect = require("chai").expect,
offerHistory = require('../util/OfferHistorydb');

describe('selectLatestOfferHistoryById',function(){
	it('shows offer for a specific Id', function(done){
		var ofr=[];
		ofr.offerId=1;
		console.log("----Test 1:Select Offer History By Id----\n"); 
		offerHistory.selectLatestOfferHistoryById(function(results,err){
			if (err) return done(err);

			console.log(JSON.stringify(results));
			done();
			console.log("----End of TestCase1----");
		},ofr);

	})
});


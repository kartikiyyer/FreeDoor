/**
 * New node file
 */

var constants = require("../util/Constants");
var offerdb = require("../util/Offerdb");
var commentdb = require("../util/Commentdb");
var offerHistorydb = require("../util/OfferHistorydb");

exports.createOffer = function(req, res) {
	var offer = [];
	offer.buyingQty = req.body[constants.BUYING_QTY];
	offer.offeredDetails = req.body[constants.OFFERED_DETAILS];
	offer.buyerStatus = req.body[constants.BUYER_STATUS];
	offer.sellerStatus = req.body[constants.SELLER_STATUS];
	offer.offerExpiry = req.body[constants.OFFER_EXPIRY];
	offer.productId = req.body[constants.PRODUCT_ID];
	offer.buyerId = req.body[constants.BUYER_ID];
	offer.comments = req.body[constants.COMMENTS];
	//offer.lastModified = req.body[costants.LAST_MODIFIED];
	var date = new Date();
	offer.lastModified = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
	
	if(offer.buyingQty != "" && offer.offeredDetails != "" && offer.buyerStatus != "" && offer.sellerStatus != "" && offer.offerExpiry != "" && offer.productId != "" && offer.comments) {
		offerdb.insertOffer(function(results, error) {
			if(error === null) {
				offer.offerId = results.insertId;
				//console.log(user);
				res.send({offerId: offer.offerId, buyingQty: offer.buyingQty, offeredDetails: offer.offeredDetails, buyerStatus: offer.buyerStatus, sellerStatus: offer.sellerStatus, offerExpiry: offer.offerExpiry, productId: offer.productId, buyerId: offer.buyerId, comments: offer.comments, lastModified:offer.lastModified});
			} else {
				res.send({error: error});
			}
		}, offer);
	} else {
		res.status(400).send("Missing fields!!!");
	}
};

exports.updateOffer = function(req, res) {
	var offer = [];
	offer.buyingQty = req.body[constants.BUYING_QTY];
	offer.offeredDetails = req.body[constants.OFFERED_DETAILS];
	offer.buyerStatus = req.body[constants.BUYER_STATUS];
	offer.sellerStatus = req.body[constants.SELLER_STATUS];
	offer.offerExpiry = req.body[constants.OFFER_EXPIRY];
	offer.productId = req.body[constants.PRODUCT_ID];
	offer.buyerId = req.body[constants.BUYER_ID];
	offer.offerId = req.params.offerId;
	//offer.comments = req.body[constants.COMMENTS];
	//offer.lastModified = req.body[costants.LAST_MODIFIED];
	var date = new Date();
	offer.lastModified = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();
	var lastEvent = "";
	
	if(offer.buyingQty != "" && offer.offeredDetails != "" && offer.buyerStatus != "" && offer.sellerStatus != "" && offer.offerExpiry != "" && offer.productId != "" && offer.buyerId != "" && offer.lastModified != "") {
		offerdb.selectOfferById(function(results1, error) {
			if(error == null) {
				if(results1.length > 0) {
					if(results1[0].buyingQty != offer.buyingQty)
						lastEvent = lastEvent + "oldValue:"+results1[0].buyingQty+",newValue:" + offer.buyingQty;
					if(results1[0].offeredDetails != offer.offeredDetails)
						lastEvent = lastEvent + "oldValue:"+results1[0].offeredDetails +",newValue:" + offer.offeredDetails;
					if(results1[0].buyerStatus != offer.buyerStatus)
						lastEvent = lastEvent + "oldValue:"+results1[0].buyerStatus +",newValue:" + offer.buyerStatus;
					if(results1[0].sellerStatus != offer.sellerStatus)
						lastEvent = lastEvent + "oldValue:"+results1[0].sellerStatus +",newValue:" + offer.sellerStatus;
					var oldOfferExpiry = new Date(results1[0].offerExpiry);
					var newOfferExpiry = new Date(offer.offerExpiry);

					if(oldOfferExpiry.getDate() != (newOfferExpiry.getDate() + 1) || oldOfferExpiry.getMonth() != newOfferExpiry.getMonth() || oldOfferExpiry.getFullYear() != newOfferExpiry.getFullYear()) 
						lastEvent = lastEvent + "oldValue:"+ results1[0].offerExpiry +",newValue:" + offer.offerExpiry;
					if(results1[0].productId != offer.productId)
						lastEvent = lastEvent + "oldValue:"+results1[0].productId +",newValue:" + offer.productId;
					if(results1[0].buyerId != offer.buyerId)
						lastEvent = lastEvent + "oldValue:"+results1[0].buyerId +",newValue:" + offer.buyerId;
					if(results1[0].offerId != offer.offerId)
						lastEvent = lastEvent + "oldValue:"+results1[0].offerId +",newValue:" + offer.offerId;
					
					if(lastEvent != "") {
						var offerHistory = [];
						offerHistory.modified = lastEvent;
						var date = new Date();
						offerHistory.lastModified = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
						offerHistory.offerId = offer.offerId;
						offerHistorydb.insertOfferHistory(function(results, error) {
						},offerHistory)
					}
					offerdb.editOffer(function(results, error) {
						if(error === null) {
							if(results.affectedRows > 0 ) {
								res.send({offerId: offer.offerId, buyingQty: offer.buyingQty, offeredDetails: offer.offeredDetails, buyerStatus: offer.buyerStatus, sellerStatus: offer.sellerStatus, offerExpiry: offer.offerExpiry, productId: offer.productId, buyerId: offer.buyerId, lastModified:offer.lastModified});
							}
						} else {
							res.send({error: error});
						}
					}, offer);
				}
			}
			
		},offer);		
	} else {
		res.status(400).send("Missing fields!!!");
	}
};


exports.removeOffer = function(req, res) {
	var offer = [];
	offer.offerId = req.params.offerId;
	offerdb.deleteOfferById(function(results, error) {
		if(error == null) {
			if(results.affectedRows > 0) {
				res.send();
			} else {
				res.send({error : "No offer to delete!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	}, offer);
};

exports.getOffer = function(req, res) {
	var offer = [];
	var jsonOffer = "";
	offer.offerId = req.params.offerId;
	offerdb.selectOfferById(function(results, error) {
		if(error == null) {
			if(results.length > 0) {
				var off = results[0];
				commentdb.selectCommentByOfferId(function(results1, error) {
					if(error == null) {
						off.comments = results1;
						offerHistorydb.selectLatestOfferHistoryById(function(results2, error) {
							off.lastEvent = results2;
							jsonOffer = JSON.stringify(off);
							res.send(jsonOffer);
						}, offer);
					}
				}, offer);
			} else {
				res.send({error : "No offer found!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	}, offer);
};

exports.getOffers = function(req, res) {
	var offer = [];
	var jsonOffer = "";
	offer.offerId = req.params.offerId;
	offerdb.selectOffers(function(results, error) {
		if(error == null) {
			if(results.length > 0) {
				
				/*commentdb.selectCommentByOfferId(function(results1, error) {
					if(error == null) {
						off.comments = results1;
						jsonOffer = JSON.stringify(off);
						res.send(jsonOffer);
					}
				}, offer);*/
				res.send({offers: results});
			} else {
				res.send({error : "No offers found!!!"});
			}
		} else {
			// TODO: Need to implement status codes
			res.status(500).send({error : error});
		}
	}, offer);
};


//Refactoring all the middlware 
var Campground = require("../models/campground"); 
var Comment   = require("../models/comment");

var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){

		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			res.rediret("back");
		}
		else{
			//check if the user owns the campground
			if(foundCampground.author.id.equals(req.user._id)){
	  			 next(); //run the code in edit/update /delete
		}	else{
			req.flash("error", "Permission Denied");
			res.redirect("back");
		}
		}
	});
	}
		else{
			req.flash("error", "Please Log in!");
			console.log("YOU NEED TO LOG IN"); 
			res.redirect("back");
		}
};
middlewareObj.checkCommentOwnerShip = function (req,res,next){
		if(req.isAuthenticated()){

		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.rediret("back");
		}
		else{
			//check if the user owns the campground
			req.flash("error", "Campground not found");
			if(foundComment.author.id.equals(req.user._id)){
	  			 next(); //run the code in edit/update /delete
		}	else{
			req.flash("error", "Permission Denied");
			res.redirect("back");
		}
		}
	});
	}
		else{ 
			req.flash("error", "You need to be logged in!");
			res.redirect("back");
		}
};
middlewareObj.isLoggedIn= function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}	
	//flash before you redirect
	req.flash("error","Please Login First!");
	res.redirect("/login");
};

module.exports = middlewareObj;
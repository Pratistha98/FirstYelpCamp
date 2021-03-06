var express = require("express"); 
var router  = express.Router();
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware  = require("../middleware");

//Comments new
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn,function(req,res){
	//find campfround by ID
	Campground.findById(req.params.id, function(err, campground){

	if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {campground:campground});
		}
	});
	
});

//Comments Create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				}
				else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
							
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "Sucessfully added comment");
					res.redirect("/campgrounds/" +  campground._id);
				}
			});
		}
	});
});

//Comments edit
router.get("/campgrounds/:id/comments/:comment_id/edit" , middleware.checkCommentOwnerShip, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err){
			res.redirect("back");
		}
		else {
		res.render("comments/edit",{campground_id: req.params.id, comment:foundComment});	
		}
	});
	
});

//Comments update
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//Comments Delete
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(req, res){
	//FindByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success", "Successfully deleted comment");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;
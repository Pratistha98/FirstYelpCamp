

var mongoose   = require("mongoose"); 
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var data = [
	{
		name: "Rose",
		image: "https://images.unsplash.com/photo-1461342249744-29a57e9bd1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
		description: "Shot from macpro"
	},
		{
		name: "Flowers",
		image: "https://images.unsplash.com/photo-1433888104365-77d8043c9615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
		description: "Asorted-color petaled flower"
	},
		{
		name: "Tulip",
		image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
		description: "I like Tulip"
	},
		{
		name: "Daisy",
		image: "https://images.unsplash.com/photo-1501935844376-ecd9840fd989?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
		description: "I love Daisy"
	}
];
function seedDB(){
//remove all the campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Removed Comments");
			data.forEach (function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					}
					else{
						console.log("added a campground");
						Comment.create(
						{
							text: "This flower is beautiful but I am allergic to it", 
							author: "Macy"
						},function(err, comment){
							if (err){
								console.log(err);
							}
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("created a new comment");
							}
						});
					}
				});
			});
		}
	});
}

module.exports=seedDB;
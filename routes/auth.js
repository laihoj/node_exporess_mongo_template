const 	express 	= require("express"),
	 	router 		= express.Router(),
		passport 	= require("passport");


const db = require('./../db.js');
const utils = require('./../utils.js');


router.post("/users", async function(req,res){
	let user = await db.createUser(req.body.username, req.body.password);
	if(user) {
		passport.authenticate("local")(req, res, function() {
			res.redirect(req.session.redirectTo || '/users/' +req.user);
			delete req.session.redirectTo;
		});
	} else {
		res.redirect("/");
	}
});

router.delete("/users/:id", utils.isAuthenticated, async function(req,res) {
	let userObj = await db.getUserById(req.params.id);
	await db.deleteUser(userObj);
	res.redirect("/register");
});

router.get("/login", function(req, res) {
	res.render('pages/login');
});

router.get("/register", function(req, res) {
	res.render('pages/register');
});

router.get("/logout",function(req, res){
	req.logout();
	req.flash("success", "Logged out");
	res.redirect("/");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/auth/login", failureFlash: true}), function(req, res) {
	if(!req.user) {
		req.flash("warning", "Something weird happened when trying to log in");
		res.render("pages/login");
	} else {
		req.flash("success", "Logged in");
		res.redirect(req.session.redirectTo || '/');
		delete req.session.redirectTo;
	}
});

module.exports = router;
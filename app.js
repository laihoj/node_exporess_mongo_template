if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser 				= require("body-parser"),
	express 					= require("express"),
	request						= require("request"),
	flash						= require("connect-flash"),
	passport 					= require("passport"),
	LocalStrategy 				= require("passport-local"),
	passportLocalMongoose 		= require("passport-local-mongoose"),
	methodOverride				= require("method-override"),
	app							= express();

const User = require("./models/user");

const auth = require('./auth.js');


app.use(require("express-session")({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error 	= req.flash("error");
	res.locals.success 	= req.flash("success");
	res.locals.warning 	= req.flash("warning");

	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	
	next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const domain = process.env.DOMAIN || "localhost:3000";

const db = require('./db.js');
const utils = require('./utils.js');

app.use('/auth',require("./routes/auth"));

app.get("/", async function(req, res) {
	let data = {
		message: "Hello World"
	};
	res.render("pages/index", {data:data});
});

/*********************************************************************************
YOUR CODE HERE
*********************************************************************************/
app.use(require("./routes/app.js"));


/*********************************************************************************
YOUR CODE OVER
*********************************************************************************/

app.listen(process.env.PORT || 3000, function() {
	console.log("App server is running");
});



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();	//looks for a file named '.env' where key=value pairs can be defined
}

const bodyParser 				= require("body-parser"),
	express 					= require("express"),
	request						= require("request"),	//maybe not so important
	flash						= require("connect-flash"),
	passport 					= require("passport"),
	LocalStrategy 				= require("passport-local"),
	passportLocalMongoose 		= require("passport-local-mongoose"),
	methodOverride				= require("method-override"),
	app							= express();

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
	res.locals.current_user = req.user;				//developer can make use of these
	res.locals.error 	= req.flash("error");		//developer can make use of these
	res.locals.success 	= req.flash("success");		//developer can make use of these
	res.locals.warning 	= req.flash("warning");		//developer can make use of these

	res.header("Access-Control-Allow-Origin", "*");													//i wonder what these do
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");	//i wonder what these do
  	
	next();
});

const User = require("./models/default_user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const domain = process.env.DOMAIN || "localhost:3000";

/*---------------------------------------------------------------------------------*/
app.use(require("./routes/app.js"));	//TODO: Put your code in here
/*---------------------------------------------------------------------------------*/

/*
Routes are served on a first come first served basis.
I.e. if you define your own /auth or / paths, they will 'overwrite' the default paths
*/
app.use('/auth', require("./routes/auth"));

app.get("/", async function(req, res) {
	let data = {
		message: "Hello World"
	};
	res.render("pages/default_index", {data:data});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("App server is running");
});



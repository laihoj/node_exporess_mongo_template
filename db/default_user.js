/********************************************************
Mongoose.js and MongoDB
********************************************************/
const 	mongoose 	= require('mongoose'),
		url 		= process.env.DATABASEURL,
		User 		= require("./../models/default_user");
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});

/********************************************************
Exports
********************************************************/

exports.createUser = async function(username, password) {
	let user;
	try {
		user = await save(username, password);
	} catch(err) {
		console.log(err);
	}
	return user;
}

exports.getUserById = async function(userId) {
	let userObj;
	try {
		userObj = await byId(userId);
	} catch(err) {
		console.log(err);
	}
	return userObj;
}

exports.deleteUser = async function(userObj) {
	try {
		await destroy(userObj);
	} catch(err) {
		console.log(err);
	}
	return userObj;
}



/********************************************************
Generated
********************************************************/


const all = async function() {
	let res = await User.find({}, function(err, foundUsers) {
		if(err) {
			console.log(err);
		}
	});
	return res;
}

const byID = async function(id) {
	let res = await User.findOne({_id: id}, function(err, foundUser) {
		if(err) {
			console.log("No user found");
		} else {}
	}).exec();
	return res;
}

const get = async function(user) {
	let res = await User.findOne({username: user}, function(err, foundUser) {
		if(err) {
			console.log(err);
		}
	}).exec();
	return res;
}

//if username already taken and password matches, user is simply logged in
const save = async function(username, password) {
	let foundByUsername = await exports.get(username);
	if(foundByUsername) {
  		return false;
	} else {
		const newUser = new User({username:username});
		await newUser.setPassword(password);

		await newUser.save();
		return newUser;
	}
}

const destroy = async function(id) {
	let res = await exports.byID(id);	
	res.delete(function(err, deletedUser) {
		if(err || !deletedUser) {
			console.log("No user deleted");
		}
	});
	return res;
}
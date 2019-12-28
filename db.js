const users 		= require("./db/user.js");

exports.createUser = async function(username, password) {
	let user;
	try {
		user = await users.save(username, password);
	} catch(err) {
		console.log(err);
		return err;
	}
	return user;
}

exports.getUserById = async function(userId) {
	let userObj;
	try {
		userObj = await users.byId(userId);
	} catch(err) {
		console.log(err);
		return err;
	}
	return userObj;
}

exports.deleteUser = async function(userObj) {
	try {
		await users.delete(userObj);
	} catch(err) {
		console.log(err);
		return err;
	}
	return userObj;
}
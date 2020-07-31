const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = lowdb(adapter);

const TABLENAME = 'users';

exports.getUser = async username => {
	try {
		const data = await db.get(TABLENAME).find({username: username}).value();
		return data;
	} catch {
		return null;
	}
};

exports.createUser = async user => {
	try {
		await db.get(TABLENAME).push(user).write();
		return true;
	} catch {
		return false;
	}
};

exports.updateRefreshToken = async (username, refreshToken) => {
	try {
		await db
			.get(TABLENAME)
			.find({username: username})
			.assign({refreshToken: refreshToken})
			.write();
		return true;
	} catch {
		return false;
	}
};

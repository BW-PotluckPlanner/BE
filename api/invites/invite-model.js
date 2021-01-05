const db = require("../../data/dbConfig.js");

module.exports = {
	findByCode,
	findByPotluck,
	insert,
	update
};

function findByCode(code) {
	return db
		.select("*")
		.from("potluck_code")
		.where({ code })
		.first();
}

function findByPotluck(potluck_id) {
	return db
		.select("*")
		.from("potluck_code")
		.where({ potluck_id })
		.first();
}

function insert(codeData) {
	const {potluck_id, newCode} = codeData;
	return db("potluck_code")
		.insert({
			potluck_id: potluck_id,
			code: newCode,
			isValid: true,
		})
		.then(() => {
			return findByCode(newCode)
		})
		
		
}

function update(changes) {

	const { newCode, potluck_id } = changes;

	return db("potluck_code")
		.where({ potluck_id })
		.update({ 
			code: newCode,
			isValid: true,
			potluck_id: potluck_id
		})
		.then(() => {
			return findByCode(newcode);
		})
		.catch((err)=> {
			console.log(err)
		});
}

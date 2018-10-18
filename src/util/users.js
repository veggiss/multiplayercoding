const rug = require('random-username-generator');
const ran = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

let user = {
	username: rug.generate(),
	school: 'University of Agder',
	age: ran(15, 30),
	level: ran(1, 10),
	xp: ran(1, 100),
	wins: ran(5, 50)
}

module.exports = {
	user: user
}
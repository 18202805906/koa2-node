const util = require("util");
const jwt = require("jsonwebtoken");
const secret = "zw121_#jf55";

const tokenSign = (tokenContent) => {
	return jwt.sign(tokenContent, secret, { expiresIn: "2h" })
}

const tokenVerify = async (token) => {
	const verify = util.promisify(jwt.verify)
	return verify(token.split(" ")[1], secret)
}

module.exports = {
	tokenSign,
	tokenVerify,
}
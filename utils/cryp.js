//使用rsa进行加密解密
const NodeRSA = require("node-rsa");

const key = new NodeRSA({ b: 2048 }); //生成2048位的密钥
key.setOptions({ encryptionScheme: 'pkcs1' });//指定加密格式  不改格式得话可能会报错
//缓存私钥
let privateDer;

function getPublicKey(){
	let publicDer = key.exportKey("pkcs8-public-pem"); //导出公钥
	privateDer = key.exportKey('pkcs8-private-pem'); //导出私钥
	publicDer = publicDer.replace(/\n/g,'');
	publicDer = publicDer.replace('-----BEGIN RSA PUBLIC KEY-----','');
	publicDer = publicDer.replace('-----END RSA PUBLIC KEY-----','');
	return publicDer;
	 
};

function decrypted(buff){
	key.importKey(privateDer); //导入私钥
	return key.decrypt(buff, 'utf8')
}

module.exports = {
	getPublicKey,
	decrypted
}
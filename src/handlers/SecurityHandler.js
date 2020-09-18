const config = require('../configs/config');

var encryptor = require('simple-encryptor')(config.secretKey);

function EncriptPassMongo(textToEncrypt) {
    return encrypted = encryptor.encrypt(textToEncrypt);
}

function DecriptPassMongo(textToDecrypt) {
    return encrypted = encryptor.decrypt(textToDecrypt);
}

module.exports.EncriptPassMongo =EncriptPassMongo;
module.exports.DecriptPassMongo =DecriptPassMongo;
const jwt = require('jsonwebtoken');

function GenerateToken(req,app) {
    if(req.body.userName === "asfo" && req.body.passWord === "holamundo") {
        const payload = {
         check:  true
        };
        const token = jwt.sign(payload, app.get('masterKey'), {
         expiresIn: 1440
        });
        return token;
          } else {
              return 0;
        }
}

module.exports.GenerateToken =GenerateToken;
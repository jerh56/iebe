const http = require('http');
let port = process.env.PORT;
module.exports = {
    "port": port ,
    "appEndpoint": "http://localhost:`port`",
    "apiEndpoint": "http://localhost:`port`",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
};
const http = require('http');
function normalizePort(val) {
    var nport = parseInt(val, 10);
  
    if (isNaN(nport)) {
      // named pipe
      return val;
    }
  
    if (nport >= 0) {
      // port number
      return nport;
    }
  
    return false;
  }
//let port = process.env.PORT;
let port = normalizePort(process.env.PORT || '3600');
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
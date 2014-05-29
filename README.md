Overview
=====================

Adds basic auth to socket connections in express.  Only tested with [ws](https://www.npmjs.org/package/ws).  Socket.io is not supported.

### Example
```js
var express = require('express');
var wsBasicAuth = require("ws-basic-auth-express");
var http = require('http');
var WebSocketServer = require('ws').Server

var app = express();
var server = http.createServer(app);
var wss = new WebSocketServer({server: server});

var wsAuth = wsBasicAuth(function(username, password) {
  return username === process.env.USERNAME && password === process.env.PASSWORD;
});

#All upgrade requests go through auth
server.on('upgrade', wsAuth);

```

Credits
=====================
The basic auth code was borrowed from [basic-auth-connect](https://github.com/expressjs/basic-auth-connect)

The connection abort code was borrowed from [ws](https://github.com/einaros/ws).
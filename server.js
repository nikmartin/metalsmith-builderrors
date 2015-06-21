'use strict';

var http = require('http');

var express = require('express'),
  app = express(),
  http = require('http'),
  path = require('path'),
  port = 9000;

__dirname = path.resolve(__dirname, './build');

app.use(express.static(__dirname));

var httpServer = http.createServer(app);
httpServer.listen(port, function() {
  console.log('express server started on port %s', port);
});

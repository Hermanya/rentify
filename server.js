(function() {
  var app, express, get, http, path;

  express = require('express');

  get = require('./routes/get');

  http = require('http');

  path = require('path');

  app = express();

  app.set('port', process.env.PORT || 3000);

  app.use(express["static"](path.join(__dirname, 'public')));

  app.get('/get/list', get.list);

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
  });

}).call(this);

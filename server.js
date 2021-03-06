(function() {
  var app, bcrypt, bodyParser, cookieParser, db, express, fileSystem, get, http, methodOverride, mongodb, mongoskin, multer, other, path, post, session;

  express = require('express');

  get = require('./routes/get');

  post = require('./routes/post');

  other = require('./routes/index');

  http = require('http');

  path = require('path');

  fileSystem = require('fs');

  bodyParser = require('body-parser');

  cookieParser = require('cookie-parser');

  session = require('express-session');

  methodOverride = require('method-override');

  multer = require('multer');

  mongodb = require('mongodb');

  mongoskin = require('mongoskin');

  db = mongoskin.db("mongodb://107.170.165.111:27017/rentify", {
    native_parser: true
  });

  bcrypt = require('bcrypt');

  app = express();

  app.set('port', process.env.PORT || 3000);

  app.set('view engine', 'ejs');

  app.set('uploadDir', path.join(__dirname + './tmp'));

  app.use(bodyParser({
    uploadDir: path.join(__dirname + './tmp'),
    keepExtensions: true
  }));

  app.use(multer({
    dest: __dirname + './tmp/'
  }));

  app.use(cookieParser());

  app.use(session({
    secret: 'keyboard cat'
  }));

  app.use(express["static"](path.join(__dirname, 'public')));

  app.get('/', other.root);

  app.get('/signup', other.signup);

  app.get('/signin', other.signin);

  app.get('/search', other.search);

  app.get('/discover', other.discover);

  app.get('/about', other.about);

  app.get('/add', other.add);

  app.get('/me', get.me);

  app.get('/item/:id', get.item(mongodb, db));

  app.get('/get/debug', get.debug(mongodb, db));

  app.get('/get/user/:id', get.user(mongodb, db));

  app.post('/register', post.user(db, fileSystem, path, bcrypt));

  app.post('/post/item', post.item(db, fileSystem, path));

  app.get('/logout', other.logout);

  app.post('/searchResults', get.searchResults(mongodb, db));

  app.post('/loginHandler', other.loginHandler(db, bcrypt));

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
  });

}).call(this);

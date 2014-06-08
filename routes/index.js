exports.loginHandler = function(db, bcrypt) {
  return function(req, res) {
    var collection, email;
    email = req.body.email;
    collection = db.collection('user');
    return collection.findOne({
      email: email
    }, function(error, user) {
      var password;
      if (error || user === null) {
        res.json({
          error: 'Wrong email or password'
        });
      }
      password = req.body.password;
      return bcrypt.compare(password, user.hash, function(err, resp) {
        if (resp) {
          req.session.user = user;
          return res.render('search', {});
        } else {
          return res.json({
            error: 'Wrong email or password'
          });
        }
      });
    });
  };
};

exports.logout = function(req, res) {
  delete req.session.user;
  return res.json({
    logged: "out"
  });
};

exports.root = function(req, res) {
  console.log(req.session.user);
  if (req.session.user) {
    return res.render('search', req.session.user);
  } else {
    return res.render('signin', {});
  }
};

exports.signin = function(req, res) {
  return res.render('signin', {});
};

exports.signup = function(req, res) {
  return res.render('signup', {});
};

exports.add = function(req, res) {
  return res.render('additem', {});
};

exports.search = function(req, res) {
  return res.render('search', {});
};

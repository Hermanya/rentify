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
        return;
      }
      password = req.body.password;
      return bcrypt.compare(password, user.hash, function(err, resp) {
        if (resp) {
          req.session.user = user;
          return res.json(user);
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
  if (req.session && req.session.user === void 0) {
    return res.render('signup', {});
  } else {
    return res.render('search', {});
  }
};

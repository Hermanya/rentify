exports.loginHandler = function(db, bcrypt) {
  return function(req, res) {
    var collection, email, password;
    email = req.body.email;
    collection = db.collection('user');
    collection.findOne({
      email: email
    }, function(error, user) {});
    if (error || user === null) {
      res.json({
        error: 'Wrong email or password'
      });
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
  };
};

exports.logout = function(req, res) {
  delete req.session.user;
  return res.json({
    logged: "out"
  });
};

exports.root = function(req, res) {
  console.log(req.session);
  if (req.session) {
    return res.render('search', req.session.user);
  } else {
    return res.render('signin', {});
  }
};

exports.signup = function(req, res) {
  return res.render('singup', {});
};

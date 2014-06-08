
/*
  CREATE users
 */
exports.user = function(db, fileSystem, path, bcrypt) {
  return function(req, res) {
    var salt, u, user;
    user = {};
    u = req.body;
    if (!(u.name && u.email && u.password && u.address)) {
      res.json({
        error: "Form is incomplete"
      });
      return;
    }
    user.name = u.name;
    user.email = u.email;
    user.address = u.address;
    user.phoneNumber = u.phoneNumber;
    salt = bcrypt.genSaltSync(10);
    user.hash = bcrypt.hashSync(u.password, salt);
    user.offeredItems = [];
    user.acceptedItems = [];
    user.rating = 10;
    return db.collection('user').find({
      email: user.email
    }).toArray(function(err, users) {
      if (users.length === 0) {
        return db.collection('user').insert(user, function(err) {
          if (err === null) {
            return res.json(user);
          } else {
            return res.json({
              error: "Internal error, try again"
            });
          }
        });
      } else {
        return res.json({
          error: "Already regestered"
        });
      }
    });
  };
};

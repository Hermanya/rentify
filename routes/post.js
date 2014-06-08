
/*
  CREATE users
 */
exports.user = function(db, fileSystem, path, bcrypt) {
  return function(req, res) {
    var salt, u, user;
    user = {};
    console.log(req.body, 'ok');
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
    console.log(user);
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


/*
  Add items
 */

exports.item = function(db, fileSystem, path) {
  return function(req, res) {
    var item, tmp;
    tmp = req.body;
    if (!(tmp.name && tmp.description && req.files.picture && tmp.charge)) {
      res.json({
        error: "Form is incomplete"
      });
    }
    item = {};
    item.name = tmp.name;
    item.description = tmp.description;
    item.charge = tmp.charge;
    item.status = 'available';
    item.ownerId = req.session.user._id;
    item.tags = [];
    return db.collection('item').insert(item, function(err) {
      if (err === null) {
        return res.json(item);
      } else {
        return res.json({
          error: "Internal error, try again"
        });
      }
    });
  };
};

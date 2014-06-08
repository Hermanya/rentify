
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
            return res.render('search', {});
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
    console.log(req.body, req.files);
    if (!(tmp.name && tmp.description && req.files.image && tmp.charge)) {
      res.json({
        error: "Form is incomplete"
      });
      return;
    }
    item = {};
    item.name = tmp.name;
    item.description = tmp.description;
    item.charge = parseFloat(tmp.charge);
    if (isNaN(item.charge)) {
      item.charge = 20;
    }
    item.status = 'available';
    item.ownerId = req.session.user._id;
    item.tags = [tmp.name, tmp.description].join(' ').replace(/[\.,]/g, ' ');
    return db.collection('item').insert(item, function(err) {
      var targetPath, tempPath;
      if (err === null) {
        tempPath = req.files.image.path;
        targetPath = path.resolve("./images/" + item._id);
        console.log(tempPath, targetPath);
        fileSystem.rename(tempPath, targetPath, function(err) {});
        if (err) {
          return res.json(err);
        } else {
          return res.render('item', item);
        }
      } else {
        return res.json({
          error: "Internal error, try again"
        });
      }
    });
  };
};

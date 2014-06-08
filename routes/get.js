
/*
  GET users listing.
 */
exports.user = function(mongodb, db) {
  return function(req, res) {
    return db.collection('user').findOne({
      _id: mongodb.ObjectID.createFromHexString(req.params.id)
    }, function(err, user) {
      if (err || user === null) {
        return res.json({
          error: 'Not found'
        });
      } else {
        return res.json(user);
      }
    });
  };
};


/*
  GET users listing.
 */

exports.me = function(req, res) {
  return res.render('profile', req.session.user);
};

exports.debug = function(mongodb, db) {
  return function(req, res) {
    return db.collection('item').find().toArray(function(err, users) {
      if (err || users === null) {
        return res.json({
          error: 'User'
        });
      } else {
        return res.json(users);
      }
    });
  };
};

exports.item = function(mongodb, db) {
  return function(req, res) {
    return db.collection('item').findOne({
      _id: mongodb.ObjectID.createFromHexString(req.params.id)
    }, function(err, item) {
      if (err || item === null) {
        return res.json({
          error: 'Not found'
        });
      } else {
        return res.json(item);
      }
    });
  };
};

exports.searchResults = function(mongodb, db) {
  return function(req, res) {
    var tags;
    tags = req.body.query.toLowerCase().split(' ');
    return db.collection('item').find({
      tags: {
        $in: tags
      }
    }).toArray(function(err, items) {
      console.log(err, items);
      if (err || items === null) {
        return res.json({
          error: 'Not found'
        });
      } else {
        return res.render('searchresults', {
          items: items
        });
      }
    });
  };
};


/*
  GET users listing.
 */
exports.user = function(mongodb, db) {
  var id;
  return function(req, res) {};
  id = req.params.id;
  return db.collection('user').findOne({
    _id: id
  }, function(err, user) {
    if (err || user === null) {
      return res.json(user);
    } else {
      return res.json({
        error: 'User'
      });
    }
  });
};

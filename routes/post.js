
/*
  CREATE users
 */
exports.user = function(db, fileSystem, path) {
  return function(req, res) {
    var user;
    user = req.body;
    return db.collection('user').insert(user, function(err) {
      if (err === null) {
        return res.send(user);
      } else {
        return res.send(err);
      }
    });
  };
};

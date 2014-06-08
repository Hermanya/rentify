
/*
  GET users listing.
 */
exports.user = function(db) {
  return function(req, res) {
    return db.collection('user').find().toArray(function(err, items) {
      console.log(err, items);
      return res.json(items);
    });
  };
};

###
  GET users listing.
###

exports.user = (db)->
  (req, res)->
    db.collection('user').find().toArray((err, items)->
      console.log err, items
      res.json items
    )

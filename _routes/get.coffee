###
  GET users listing.
###
exports.user = (mongodb, db)->
  return (req, res)->
  id = req.params.id
	#id = mongodb.ObjectID.createFromHexString(id);
  db.collection('user').findOne({_id: id}, (err, user)->
    if err or user is null
      res.json(user)
    else
      res.json({error: 'User'})
  )

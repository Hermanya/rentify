###
  GET users listing.
###
exports.user = (mongodb, db) ->
  return (req, res) ->
    db.collection('user')
    .findOne({_id: mongodb.ObjectID.createFromHexString(req.params.id)},
    (err, user) ->
      if err or user is null
        res.json({error: 'Not found'})
      else
        res.json(user)
    )

###
  GET users listing.
###
exports.me = (req, res) ->
  res.render 'user', req.session.user

exports.debug = (mongodb, db) ->
  return (req, res) ->
    db.collection('user').find().toArray((err, users) ->
      if err or users is null
        res.json({error: 'User'})
      else
        res.json(users)
    )

exports.item = (mongodb, db) ->
  return (req, res) ->
    db.collection('item')
    .findOne({_id: mongodb.ObjectID.createFromHexString(req.params.id)},
    (err, item) ->
      if err or item is null
        res.json({error: 'Not found'})
      else
        res.json(item)
    )

exports.searchResults = (mongodb, db) ->
  return (req, res) ->
    tags = req.body.query.split(' ')
    db.collection('item')
    .find({tags:{$in:tags}})
    .toArray((err, items) ->
      if err or items is null
        res.json({error: 'Not found'})
      else
        res.render 'searchresults', {items:items}
    )

###
  CREATE users
###

exports.user = (db,fileSystem,path,bcrypt)->
  return (req, res)->
    user = {}
    console.log req.body, 'ok'
    u = req.body
    if not (u.name and u.email and u.password and u.address)
      res.json {error: "Form is incomplete"}
      return
    user.name = u.name
    user.email = u.email
    user.address = u.address
    user.phoneNumber = u.phoneNumber
    salt = bcrypt.genSaltSync 10
    user.hash = bcrypt.hashSync u.password, salt
    user.offeredItems = []
    user.acceptedItems = []
    user.rating = 10
    console.log user
    db.collection('user').find({email:user.email}).toArray (err,users)->
      if users.length is 0
        db.collection('user').insert user, (err)->
          if err is null
            res.json user
          else
            res.json {error: "Internal error, try again"}
      else
        res.json {error: "Already regestered"}

###
  Add items
###
exports.item = (db,fileSystem,path) ->
  return (req,res) ->
    tmp = req.body
    if not (tmp.name and tmp.description and req.files.picture and tmp.charge)
      res.json {error: "Form is incomplete"}
    item = {}
    item.name = tmp.name
    item.description = tmp.description
    item.charge = tmp.charge
    item.status = 'available'
    item.ownerId = req.session.user._id
    item.tags = []
    db.collection('item').insert(item, (err) ->
      if err is null
        res.json item
      else
        res.json {error: "Internal error, try again"}
    )

###
  CREATE users
###

exports.user = (db,fileSystem,path,bcrypt)->
  return (req, res)->
    user = {}
    u = req.body
    if not (u.name && u.email && u.password && u.address)
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
    db.collection('user').find({email:user.email}).toArray (err,users)->
      if users.length is 0
        db.collection('user').insert user, (err)->
          if err is null
            res.json user
          else
            res.json {error: "Internal error, try again"}
      else
        res.json {error: "Already regestered"}

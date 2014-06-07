###
  CREATE users
###

exports.user = (db,fileSystem,path)->
  return (req, res)->
    user = req.body;

    db.collection('user').insert user, (err)->
      if err is null
    #    fileSystem.mkdir(path.resolve("./uploads/"+user.project_id+"/"+user._id));
        res.send user
      else
        res.send err

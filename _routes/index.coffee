exports.loginHandler = (db,bcrypt) ->
  return (req, res) ->
    email = req.body.email
    collection = db.collection 'user'
    collection.findOne {email: email}, (error,user) ->
	    if error or user is null
	      res.json({error: 'Wrong email or password'})
	    password = req.body.password
	    bcrypt.compare password, user.hash, (err, resp) ->
	      if resp
	        req.session.user = user
	        res.render 'search', {}
	      else
	        res.json {error: 'Wrong email or password'}


exports.logout = (req, res) ->
	delete req.session.user
	res.json {logged:"out"}

exports.root = (req, res) ->
	console.log req.session.user
	if req.session.user
	  res.render 'search', req.session.user
	else
	  res.render 'signin', {}

exports.signin = (req, res) ->
	res.render 'signin', {}

exports.signup = (req, res) ->
	res.render 'signup', {}

exports.add = (req, res) ->
	res.render 'additem', {}

exports.search = (req, res) ->
	res.render 'search', {}

exports.discover = (req, res) ->
	res.render 'discover', {}

exports.about = (req, res) ->
	res.render 'about', {}

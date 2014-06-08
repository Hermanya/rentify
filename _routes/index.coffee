 exports.loginHandler = (db,bcrypt)->
 	return (req, res)->
 		email = req.body.email
 		collection = db.collection 'user'
 		collection.findOne {email:email},(error,user)->
 			if error or user is null
 				res.json {error: 'Wrong email or password'}
 				return
 			password = req.body.password
 			bcrypt.compare password, user.hash, (err, resp)->
 				if resp
 					req.session.user = user
 					res.json user
 				else
 					res.json {error: 'Wrong email or password'}
 exports.logout = (req,res)->
 	delete req.session.user
 	res.json {logged:"out"}
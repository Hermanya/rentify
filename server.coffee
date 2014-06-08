express = require 'express'
get = require './routes/get'
post = require './routes/post'
other = require './routes/index'
http = require 'http'
path = require 'path'
fileSystem = require 'fs'

mongodb = require 'mongodb'
mongoskin = require 'mongoskin'
db = mongoskin.db "mongodb://107.170.165.111:27017/rentify",
  {native_parser:true}
bcrypt = require 'bcrypt'


app = express()

app.set 'port', process.env.PORT || 3000
app.set('view engine', 'ejs');
app.use express.static(path.join(__dirname, 'public'))

app.get '/', other.root
app.get '/get/user/:id', get.user mongodb, db
app.post '/post/user', post.user db, fileSystem, path, bcrypt
app.get '/logout', other.logout
app.get '/loginHandler', other.loginHandler db, bcrypt


http.createServer(app).listen app.get('port'), ()->
  console.log "Express server listening on port " + app.get('port')

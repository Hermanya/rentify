express = require 'express'
get = require './routes/get'
http = require 'http'
path = require 'path'

mongodb = require 'mongodb'
mongoskin = require 'mongoskin'
db = mongoskin.db "mongodb://root:ghlroedcnrwz@107.170.165.111:27017/rentify",
  {native_parser:true}
console.log db
bcrypt = require 'bcrypt'


app = express()

app.set 'port', process.env.PORT || 3000
app.use express.static(path.join(__dirname, 'public'))


app.get '/get/user', get.user(db)

http.createServer(app).listen app.get('port'), ()->
  console.log "Express server listening on port " + app.get('port')

const express = require('express')
const cors = require('cors')
const fortune = require('fortune')
const nedbAdapter = require('fortune-nedb')
const createListener = require('fortune-http')
const jsonApiSerializer = require('fortune-json-api')

const store = fortune({
  user: {
    name: String,
    
    // Many-to-one relationship of user posts to post author.
    entries: [ ['entry'], 'user' ]
  },
  entry: {
    date: String,
    meal: String,
    food: String,
    quantity: String,

    // One-to-many relationship of post author to user posts.
    user: [ 'user', 'entries' ]
  }
}, {
    adapter: [ nedbAdapter, { dbPath: __dirname + '/.db' }]
}
)

const server = express()
server.use(cors())
server.use(createListener(store, {
    serializers: [
        [ createListener.HtmlSerializer ],
        [ createListener.FormDataSerializer ],
        [ createListener.FormUrlEncodedSerializer ],
        [ jsonApiSerializer ],
    ]
}))

store.connect().then(() => {
    server.listen(4000)
    console.log('Server started on port 4000')
})
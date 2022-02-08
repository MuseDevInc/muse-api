const mongoose = require('mongoose')


const MONGODB_URI = 'mongodb://localhost:27017/muse'

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log('Connection failed!', error))

module.exports = mongoose
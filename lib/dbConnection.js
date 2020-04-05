'use stric'

module.exports = function (mongoose) {
  // Connect to mongodb
  const mongoOptions = {

    useUnifiedTopology: false,
    auto_reconnect: true,
    keepAlive: 2000,
    connectTimeoutMS: 30000,
    // reconnectTries: 60,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,

  }

    const cleanup = () => {
      mongoose.connection.close(() => {
        process.exit(0)
      })
    }
  mongoose.connect(process.env.MONGO_URI, mongoOptions)

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err)
  })

  mongoose.connection.on('reconnected', function () {
    console.debug('MongoDB reconnected')
  })

  mongoose.connection.on('connected', function () {
    console.debug('MongoDB connected')
  })

  // When the connection is disconnected, Log the error
  mongoose.connection.on('disconnected', function () {
    console.warn('MongoDB disconnected')
  })



  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
}
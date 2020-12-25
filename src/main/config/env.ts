export default {
  // mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-ts-api',
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-ts-api',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'mapx555'
}

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://cleanapi:cleanapi@cluster0.ab3ep.mongodb.net/<dbname>?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'mapx555'
}

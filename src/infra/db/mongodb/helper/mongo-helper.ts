import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string) {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect () {
    await this.client.close()
  },

  async clean (collectionName: string) {
    const collection = MongoHelper.getCollection(collectionName)
    await collection.deleteMany({})
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

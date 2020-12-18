import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string) {
    this.client = await MongoClient.connect(uri, {
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

  mapper (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

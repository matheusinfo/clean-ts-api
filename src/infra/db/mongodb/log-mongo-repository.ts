import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { MongoHelper } from '@/infra/db/mongodb'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}

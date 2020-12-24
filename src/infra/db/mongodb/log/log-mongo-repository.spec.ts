import { LogMongoRepository } from './log-repository'
import { MongoHelper } from '../helper/mongo-helper'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  beforeEach(async () => {
    await MongoHelper.clean('errors')
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await (await MongoHelper.getCollection('errors')).countDocuments()
    expect(count).toBe(1)
  })
})

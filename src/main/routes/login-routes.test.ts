import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'

describe('Login Routes', () => {
  beforeEach(async () => {
    await MongoHelper.clean('accounts')
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Matheus',
          email: 'matheus@gmail.com',
          password: '1234',
          passwordConfirmation: '1234'
        })
        .expect(200)
    })
  })
})

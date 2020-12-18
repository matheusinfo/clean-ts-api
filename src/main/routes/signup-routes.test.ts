import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'

describe('SignUp Routes', () => {
  beforeEach(async () => {
    await MongoHelper.clean('accounts')
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return an account on sucess', async () => {
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

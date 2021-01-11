import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'

describe('Login Routes', () => {
  let accountCollection: Collection

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
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

  describe('POST /login', () => {
    it('Should return 200 on login success', async () => {
      const passwordHash = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: passwordHash,
        passwordConfirmation: passwordHash
      })
      await request(app)
        .post('/api/login')
        .send({
          name: 'Matheus',
          email: 'matheus@gmail.com',
          password: '1234',
          passwordConfirmation: '1234'
        })
        .expect(200)
    })

    it('Should return 401 on login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          name: 'Matheus',
          email: 'matheus@gmail.com',
          password: '1234',
          passwordConfirmation: '1234'
        })
        .expect(401)
    })
  })
})

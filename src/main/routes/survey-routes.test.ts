import env from '../config/env'
import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'

describe('Login Routes', () => {
  let accountCollection: Collection

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await MongoHelper.clean('surveys')
    await MongoHelper.clean('accounts')
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    it('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(403)
    })

    it('Should return 204 on add survey success', async () => {
      const result = await accountCollection.insertOne({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: '1234',
        passwordConfirmation: '1234',
        role: 'admin'
      })
      const id = result.ops[0]._id
      const accessToken = sign({ id }, env.secret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }]
        })
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    it('Should return 403 on load survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
  })
})

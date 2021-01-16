import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb'
import { makeApolloServer } from './helpers'

const mockAccessToken = async (): Promise<string> => {
  const result = await accountCollection.insertOne({
    name: 'Matheus',
    email: 'matheus@gmail.com',
    password: '1234',
    passwordConfirmation: '1234'
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
  return accessToken
}

let accountCollection: Collection
let surveyCollection: Collection
let apolloServer: ApolloServer

describe('Surveys GraphQL', () => {
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyCollection = await MongoHelper.getCollection('surveys')
    await MongoHelper.clean('surveys')
    await MongoHelper.clean('accounts')
  })

  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Surveys Query', () => {
    const surveysQuery = gql`
        query surveys{
            surveys {
              id
              question
              answers {
                image
                answer
              }
              date
              didAnswer
            }
        }
    `

    it('Should return surveys', async () => {
      const accessToken = await mockAccessToken()
      const now = new Date()
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: now
      })
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const res: any = await query(surveysQuery)
      expect(res.data.surveys.length).toBe(1)
      expect(res.data.surveys[0].id).toBeTruthy()
      expect(res.data.surveys[0].question).toBe('Question')
      expect(res.data.surveys[0].date).toBe(now.toISOString())
      expect(res.data.surveys[0].didAnswer).toBe(false)
      expect(res.data.surveys[0].answers).toEqual([{
        answer: 'Answer 1',
        image: 'http://image-name.com'
      }, {
        answer: 'Answer 2',
        image: null
      }])
    })

    it('Should return AccessDeniedError if no token is provided', async () => {
      const now = new Date()
      await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: now
      })
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(surveysQuery)
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access denied')
    })
  })

  describe('Add Survey Mutation', () => {
    const addSurveyMutate = gql`
      mutation addSurvey($question: String!, $answers: [Answers!]!){
          addSurvey (question: $question, answers: $answers)
      }
    `

    it('Should add a Survey on success', async () => {
      const accessToken = await mockAccessToken()
      const { mutate } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const res: any = await mutate(addSurveyMutate, {
        variables: {
          question: 'Question',
          answers: [{
            answer: 'Answer 1'
          }, {
            answer: 'Answer 2'
          }]
        }
      })
      expect(res.data).toEqual({ addSurvey: null })
    })

    it('Should return AccessDeniedError if no token is provided', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(addSurveyMutate, {
        variables: {
          question: 'Question',
          answers: [{
            answer: 'Answer 1'
          }, {
            answer: 'Answer 2'
          }]
        }
      })
      expect(res.data).toEqual({ addSurvey: null })
    })
  })
})

import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { MongoHelper } from '@/infra/db/mongodb'
import { makeApolloServer } from './helpers'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await MongoHelper.clean('accounts')
  })

  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Login Query', () => {
    const loginQuery = gql`
        query login($email: String!, $password: String!){
            login (email: $email, password: $password){
                accessToken
                name
            }
        }
    `

    it('Should return an account on valid credentials', async () => {
      const passwordHash = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: passwordHash,
        passwordConfirmation: passwordHash
      })
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'matheus@gmail.com',
          password: '1234'
        }
      })
      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Matheus')
    })

    it('Should return UnauthorizedError on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'matheus@gmail.com',
          password: '1234'
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized error')
    })
  })

  describe('Signup Mutation', () => {

  })
})

import { Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Account Mongo Repository', () => {
  let surveyCollection: Collection

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await MongoHelper.clean('surveys')
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('ADD()', () => {
    it('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('LOAD ALL()', () => {
    it('Should loadAll surveys on success', async () => {
      const sut = makeSut()
      await surveyCollection.insertMany([{
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'other_answer'
        }],
        date: new Date()
      },{
        question: 'other_question',
        answers: [{
          image: 'other_image',
          answer: 'other_answer'
        },
        {
          answer: 'other_answer'
        }],
        date: new Date()
      }])
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
      expect(surveys[0].id).toBeTruthy()
    })

    it('Should load a empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('LOAD BY ID()', () => {
    it('Should load survey by id on success', async () => {
      const sut = makeSut()
      const result = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const id = result.ops[0]._id
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})

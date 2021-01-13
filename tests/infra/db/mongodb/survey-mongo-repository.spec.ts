import FakeObjectId from 'bson-objectid'
import { Collection } from 'mongodb'
import { MongoHelper, SurveyMongoRepository } from '@/infra/db/mongodb'
import { mockAddSurveyParams } from '@/tests/domain/mocks'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  })
  return result.ops[0]._id
}

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await MongoHelper.clean('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await MongoHelper.clean('accounts')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await MongoHelper.clean('surveyResults')
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
      const account = await mockAccountId()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const survey = result.ops[0]
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: account,
        anser: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(account)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].didAnswer).toBe(false)
    })

    it('Should load a empty list', async () => {
      const account = await mockAccountId()
      const sut = makeSut()
      const surveys = await sut.loadAll(account)
      expect(surveys.length).toBe(0)
    })
  })

  describe('LOAD BY ID()', () => {
    it('Should load survey by id on success', async () => {
      const sut = makeSut()
      const result = await surveyCollection.insertOne(mockAddSurveyParams())
      const id = result.ops[0]._id
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })

    it('Should return null if survey does not exists', async () => {
      const sut = makeSut()
      const answers = await sut.loadById(FakeObjectId.generate())
      expect(answers).toBeFalsy()
    })
  })

  describe('LOAD ANSWERS()', () => {
    it('Should load answers on success', async () => {
      const result = await surveyCollection.insertOne(mockAddSurveyParams())
      const survey = result.ops[0]
      const sut = makeSut()
      const answers = await sut.loadAnswers(survey._id)
      expect(answers).toEqual([survey.answers[0].answer, survey.answers[1].answer])
    })

    it('Should return empty array if survey not exists', async () => {
      const sut = makeSut()
      const answers = await sut.loadAnswers(FakeObjectId.generate())
      expect(answers).toEqual([])
    })
  })

  describe('CHECK BY ID()', () => {
    it('Should return true if survey exists', async () => {
      const sut = makeSut()
      const result = await surveyCollection.insertOne(mockAddSurveyParams())
      const id = result.ops[0]._id
      const survey = await sut.checkById(id)
      expect(survey).toBeTruthy()
    })

    it('Should return false if survey not exists', async () => {
      const sut = makeSut()
      const survey = await sut.checkById(FakeObjectId.generate())
      expect(survey).toBeFalsy()
    })
  })
})

import faker from 'faker'
import { SurveyResultModel } from '@/domain/models/survey-results'
import { SaveSurveyResult } from '../usecases'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: faker.random.uuid(),
  surveyId: faker.random.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSaveSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: faker.random.number({ min: 0, max: 1000 }),
    percent: faker.random.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.random.boolean()
  }, {
    answer: faker.random.word(),
    image: faker.image.imageUrl(),
    count: faker.random.number({ min: 0, max: 1000 }),
    percent: faker.random.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.random.boolean()
  }],
  date: faker.date.recent()
})

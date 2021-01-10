import faker from 'faker'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/add-survey'

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [{
      answer: faker.random.word()
    }, {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveysModel = (): SurveyModel[] => [
  mockSurveyModel(), mockSurveyModel()
]

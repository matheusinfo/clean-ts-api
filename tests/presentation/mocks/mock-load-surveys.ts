import faker from 'faker'
import { mockSurveysModel } from '@/../tests/domain/mocks'
import { SurveyModel } from '@/domain/models'
import { LoadSurveys, CheckSurveyById, LoadAnswersBySurvey } from '@/domain/usecases'

export class LoadSurveysSpy implements LoadSurveys {
  surveyModel = mockSurveysModel()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModel
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  surveyModel = [faker.random.word(), faker.random.word()]
  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.surveyModel
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}

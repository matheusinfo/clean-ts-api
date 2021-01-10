import { mockSurveyModel, mockSurveysModel } from '@/../tests/domain/mocks'
import { SurveyModel } from '@/domain/models'
import { LoadSurveys , LoadSurveyById } from '@/domain/usecases'

export class LoadSurveysSpy implements LoadSurveys {
  surveyModel = mockSurveysModel()
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveyModel
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}

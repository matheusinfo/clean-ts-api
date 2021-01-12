import { LoadSurveyByIdRepository } from '@/data/protocols/db/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/load-surveys-repository'
import { AddSurveyParams } from '@/domain/usecases/add-survey'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModel } from '@/../tests/domain/mocks'
import { AddSurveyRepository } from '@/data/protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add (surveyData: AddSurveyParams): Promise<void> {
    this.addSurveyParams = surveyData
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return this.surveyModel
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveysModels = mockSurveysModel()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return this.surveysModels
  }
}

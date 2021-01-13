import { LoadSurveyByIdRepository } from '@/data/protocols/db/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModel } from '@/../tests/domain/mocks'
import { AddSurveyRepository, CheckSurveyByIdRepository } from '@/data/protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params

  async add (surveyData: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = surveyData
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id
    return this.surveyModel
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
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

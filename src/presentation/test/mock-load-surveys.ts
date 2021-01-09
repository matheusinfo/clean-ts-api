import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { LoadSurveys, SurveyModel } from '@/presentation/controller/load-surveys/load-surveys-protocols'
import { LoadSurveyById } from '../controller/survey-result/save-survey-result-controller-protocols'

export class LoadSurveysSpy implements LoadSurveys {
  surveyModel = mockSurveysModel()

  async load (): Promise<SurveyModel[]> {
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

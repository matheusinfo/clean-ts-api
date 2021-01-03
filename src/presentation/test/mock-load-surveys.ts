import { mockSurveyModel, mockSurveysModel } from '@/domain/test'
import { LoadSurveys, SurveyModel } from '@/presentation/controller/load-surveys/load-surveys-protocols'
import { LoadSurveyById } from '../controller/survey-result/save-survey-result-controller-protocols'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}

import { mockSaveSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '@/presentation/controller/survey-result/save-survey-result-controller-protocols'

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSaveSurveyResultModel()
  surveyId: string

  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return this.surveyResultModel
  }
}

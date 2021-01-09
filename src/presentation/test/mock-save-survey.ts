import { mockSaveSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controller/survey-result/save-survey-result-controller-protocols'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSaveSurveyResultModel()
  data: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.data = data
    return this.surveyResultModel
  }
}

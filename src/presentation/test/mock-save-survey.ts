import { mockSaveSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controller/survey-result/save-survey-result-controller-protocols'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSaveSurveyResultModel()
    }
  }
  return new SaveSurveyResultStub()
}

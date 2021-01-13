import { mockSaveSurveyResultModel } from '@/../tests/domain/mocks'
import { SaveSurveyResult } from '@/domain/usecases'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSaveSurveyResultModel()
  data: SaveSurveyResult.Params

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.data = data
    return this.surveyResultModel
  }
}

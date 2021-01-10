import { mockSaveSurveyResultModel } from '@/../tests/domain/mocks'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSaveSurveyResultModel()
  data: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.data = data
    return this.surveyResultModel
  }
}

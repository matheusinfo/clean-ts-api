import { SurveyResultModel } from '@/domain/models/survey-results'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}

import { SurveyResultModel } from '@/domain/models/survey-results'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}

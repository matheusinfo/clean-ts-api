import { SurveyResultModel } from '@/domain/models/survey-results'
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

export interface SaveSurveyResultRepository {
  save (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}

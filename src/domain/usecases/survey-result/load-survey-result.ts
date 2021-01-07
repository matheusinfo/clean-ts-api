import { SurveyResultModel } from '@/domain/models/survey-results'

export interface LoadSurveyResult {
  save (surveyId: string): Promise<SurveyResultModel>
}

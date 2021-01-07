import { SurveyResultModel } from '@/domain/models/survey-results'

export interface LoadSurveyResult {
  load (surveyId: string): Promise<SurveyResultModel>
}

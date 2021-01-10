import { SurveyResultModel } from '@/domain/models/survey-results'

export interface LoadSurveyResult {
  load (surveyId: string, accountId: string): Promise<SurveyResultModel>
}

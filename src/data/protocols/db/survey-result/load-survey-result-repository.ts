import { SurveyResultModel } from '@/domain/models/survey-results'

export interface LoadSurveyResultRepository {
  loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel>
}

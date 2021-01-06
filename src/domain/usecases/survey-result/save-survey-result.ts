import { SurveyResultModel } from '@/domain/models/survey-results'

export type SaveSurveyResultParams = {
  surveyId: string
  accountId: string
  answer: string
  date: Date
}

export interface SaveSurveyResult {
  save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}

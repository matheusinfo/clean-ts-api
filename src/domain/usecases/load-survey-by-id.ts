import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  loadById(): Promise<SurveyModel>
}

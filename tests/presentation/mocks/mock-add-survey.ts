import { AddSurvey, AddSurveyParams } from '@/domain/usecases'

export class AddSurveySpy implements AddSurvey {
  surveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.surveyParams = data
  }
}

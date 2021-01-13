import { AddSurvey } from '@/domain/usecases'

export class AddSurveySpy implements AddSurvey {
  surveyParams: AddSurvey.Params

  async add (data: AddSurvey.Params): Promise<void> {
    this.surveyParams = data
  }
}

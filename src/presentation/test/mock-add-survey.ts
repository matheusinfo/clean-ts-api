import { AddSurvey, AddSurveyParams } from '@/presentation/controller/add-survey/add-survey-controller-protocols'

export class AddSurveySpy implements AddSurvey {
  surveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.surveyParams = data
  }
}

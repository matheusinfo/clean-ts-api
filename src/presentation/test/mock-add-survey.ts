import { AddSurvey, AddSurveyParams } from '@/presentation/controller/add-survey/add-survey-controller-protocols'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyParams): Promise<void> {
      return null
    }
  }
  return new AddSurveyStub()
}

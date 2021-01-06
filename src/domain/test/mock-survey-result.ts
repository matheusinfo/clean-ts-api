import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-results'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSaveSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_count',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50
  },{
    answer: 'other_answer',
    image: 'any_image',
    count: 10,
    percent: 80
  }],
  date: new Date()
})

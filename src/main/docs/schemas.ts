import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveySchema,
  surveyAnswerSchema,
  surveysSchema,
  signupParamsSchema,
  addSurveyParamsParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema
} from './schemas/'

export default {
  error: errorSchema,
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  surveyAnswerSchema: surveyAnswerSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  addSurveyParams: addSurveyParamsParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema
}

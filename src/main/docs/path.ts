import {
  loginPath,
  signUpPath,
  surveyPath,
  surveyResultPath
} from './path/index'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}

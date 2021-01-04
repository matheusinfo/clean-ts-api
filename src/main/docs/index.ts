import { loginPath, signUpPath ,surveyPath } from './path'
import { accountSchema, loginParamsSchema, errorSchema, surveySchema, surveyAnswerSchema, surveysSchema, apiKeyAuthSchema, signupParamsSchema } from './schemas/'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components/'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Typescript API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'GPL 3.0 or later',
    url: 'https://opensource.org/licenses/GPL-3.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Autenticação'
  },{
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    error: errorSchema,
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    surveyAnswerSchema: surveyAnswerSchema,
    survey: surveySchema,
    surveys: surveysSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    serverError
  }
}

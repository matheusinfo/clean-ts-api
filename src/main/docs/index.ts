import { loginPath } from './path'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas/'
import { badRequest, serverError, unauthorized, notFound } from './components/'

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
    name: 'Authentication'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    error: errorSchema,
    account: accountSchema,
    loginParams: loginParamsSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}

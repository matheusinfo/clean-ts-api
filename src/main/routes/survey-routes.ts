import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}

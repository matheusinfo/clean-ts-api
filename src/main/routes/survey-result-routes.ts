import { Router } from 'express'
import { makeSaveSurveyResultController , makeLoadSurveyResultController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth(), adaptRoute((makeSaveSurveyResultController())))
  router.get('/surveys/:surveyId/results', auth(), adaptRoute((makeLoadSurveyResultController())))
}

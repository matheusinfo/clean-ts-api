import { Router } from 'express'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result-controller-factory'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result-controller-factory'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth(), adaptRoute((makeSaveSurveyResultController())))
  router.get('/surveys/:surveyId/results', auth(), adaptRoute((makeLoadSurveyResultController())))
}

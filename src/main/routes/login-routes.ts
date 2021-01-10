import { Router } from 'express'
import { makeSignUpController , makeLoginController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}

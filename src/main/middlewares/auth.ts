import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const auth = (role?: string): any => {
  return adaptMiddleware(makeAuthMiddleware(role))
}

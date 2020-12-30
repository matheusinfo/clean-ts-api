import { adaptMiddleware } from '@/main/adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'

export const auth = (role?: string): any => {
  return adaptMiddleware(makeAuthMiddleware(role))
}

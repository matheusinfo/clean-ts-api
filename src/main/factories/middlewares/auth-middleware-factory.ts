import { makeDbLoadAccountByToken } from '@/main/factories/usecases/load-account-by-token/db-load-account-by-token-factory'
import { AuthMiddleware } from '@/presentation/middlewares/auth/auth-middleware'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}

import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories//decorators/log/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login-controller'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}

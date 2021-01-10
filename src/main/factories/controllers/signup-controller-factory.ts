import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers/signup-controller'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}

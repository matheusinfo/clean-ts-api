import env from '../../config/env'
import { Controller } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LoginController } from '../../../presentation/controller/login/login-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeLoginController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.secret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}

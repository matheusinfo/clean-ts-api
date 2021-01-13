import faker from 'faker'
import { Authentication } from '@/domain/usecases/authentication'

export class AuthenticationSpy implements Authentication {
  authenticationModel = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  authenticationParams: Authentication.Params

  async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authentication
    return this.authenticationModel
  }
}

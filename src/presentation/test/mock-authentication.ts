import faker from 'faker'
import { AuthenticationParams, Authentication } from '@/domain/usecases/account/authentication'
import { AuthenticationModel } from '@/domain/models/authentication'

export class AuthenticationSpy implements Authentication {
  authenticationModel = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  authenticationParams: AuthenticationParams

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authentication
    return this.authenticationModel
  }
}

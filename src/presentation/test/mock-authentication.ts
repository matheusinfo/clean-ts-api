import faker from 'faker'
import { AuthenticationParams, Authentication } from '@/domain/usecases/account/authentication'

export class AuthenticationSpy implements Authentication {
  token = faker.random.uuid()
  authenticationParams: AuthenticationParams

  async auth (authentication: AuthenticationParams): Promise<string> {
    this.authenticationParams = authentication
    return this.token
  }
}

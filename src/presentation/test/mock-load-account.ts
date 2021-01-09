import { mockAccountModel } from '@/domain/test'
import { AccountModel, LoadAccountByToken } from '@/presentation/middlewares/auth/auth-middleware-protocols'

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return this.accountModel
  }
}

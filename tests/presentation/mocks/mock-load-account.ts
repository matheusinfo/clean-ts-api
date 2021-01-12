import { mockAccountModel } from '@/tests/domain/mocks'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

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

import { mockAccountModel } from '@/domain/test'
import { AccountModel, LoadAccountByToken } from '@/presentation/middlewares/auth/auth-middleware-protocols'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenStub()
}

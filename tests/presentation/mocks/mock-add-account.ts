import { mockAccountModel } from '@/../tests/domain/mocks'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return this.accountModel
  }
}

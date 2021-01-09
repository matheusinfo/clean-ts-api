import { AccountModel, AddAccount, AddAccountParams } from '@/presentation/controller/signup/signup-controller-protocols'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account
    return this.accountModel
  }
}

import { AccountModel } from '@/domain/models/account'

export type AddAccountParams = Omit<AccountModel, 'id'>

export type AddAccount = {
  add (account: AddAccountParams): Promise<AccountModel>
}

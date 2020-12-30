import { AccountModel } from '@/domain/models/account'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export type AddAccount = {
  add (account: AddAccountModel): Promise<AccountModel>
}

import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
  add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = boolean
}

import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { TokenDecrypter } from '../../protocols/criptography/token-decrypter'
import { AccountModel } from '../../../domain/models/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: TokenDecrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}

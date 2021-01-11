import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { DbAddAccount } from '@/data/usecases/db-add-account'
import { AddAccount } from '@/domain/usecases/add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}

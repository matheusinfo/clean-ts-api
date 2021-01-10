import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { Authentication } from '@/domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.secret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}

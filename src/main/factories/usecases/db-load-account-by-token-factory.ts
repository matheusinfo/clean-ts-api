import env from '@/main/config/env'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { DbLoadAccountByToken } from '@/data/usecases/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.secret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}

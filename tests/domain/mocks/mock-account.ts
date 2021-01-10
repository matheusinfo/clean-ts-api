import faker from 'faker'
import { AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models/account'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export const mockAccountModel = (): AccountModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

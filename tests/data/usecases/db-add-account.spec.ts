import { DbAddAccount } from '@/data/usecases'
import { HasherSpy, AddAccountRepositorySpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAddAccountParams, mockAccountModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)
  loadAccountByEmailRepositorySpy.accountModel = null
  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(hasherSpy.value).toBe(accountData.password)
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name: accountData.name,
      email: accountData.email,
      password: hasherSpy.plaintext
    })
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(loadAccountByEmailRepositorySpy.email).toBe(accountData.email)
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()
    const accountData = mockAddAccountParams()
    const account = await sut.add(accountData)
    expect(account).toBeNull()
  })

  it('Should return an account on success', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const accountData = mockAddAccountParams()
    const account = await sut.add(accountData)
    expect(account).toEqual(addAccountRepositorySpy.accountModel)
  })
})

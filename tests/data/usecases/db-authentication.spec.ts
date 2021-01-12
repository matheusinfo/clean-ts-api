import { DbAuthentication } from '@/data/usecases'
import { HashComparerSpy, TokenEncrypterSpy, LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAuthentication } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  tokenEncrypterSpy: TokenEncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const tokenEncrypterSpy = new TokenEncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, tokenEncrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    tokenEncrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication usecase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const accountData = mockAuthentication()
    await sut.auth(accountData)
    expect(loadAccountByEmailRepositorySpy.email).toBe(accountData.email)
  })

  it('Should call HashCompare with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    const accountData = mockAuthentication()
    await sut.auth(accountData)
    expect(hashComparerSpy.value).toBe(accountData.password)
    expect(hashComparerSpy.hash).toBe(hashComparerSpy.hash)
  })

  it('Should call TokenEncrypter with correct id', async () => {
    const { sut, tokenEncrypterSpy } = makeSut()
    await sut.auth(mockAuthentication())
    expect(tokenEncrypterSpy.id).toBe(tokenEncrypterSpy.id)
  })

  it('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy, tokenEncrypterSpy } = makeSut()
    await sut.auth(mockAuthentication())
    expect(updateAccessTokenRepositorySpy.id).toBe(tokenEncrypterSpy.id)
    expect(updateAccessTokenRepositorySpy.token).toBe(tokenEncrypterSpy.ciphertext)
  })

  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.accountModel = null
    const model = await sut.auth(mockAuthentication())
    expect(model).toBe(null)
  })

  it('Should return null if HashCompare returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const model = await sut.auth(mockAuthentication())
    expect(model).toBeFalsy()
  })

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if HashCompare throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if TokenEncrypter throws', async () => {
    const { sut, tokenEncrypterSpy } = makeSut()
    jest.spyOn(tokenEncrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an AuthenticationModel if TokenEncrypter succeds', async () => {
    const { sut, tokenEncrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const { accessToken, name } = await sut.auth(mockAuthentication())
    expect(accessToken).toBe(tokenEncrypterSpy.ciphertext)
    expect(name).toBe(loadAccountByEmailRepositorySpy.accountModel.name)
  })
})

import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from './auth-middleware-protocols'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { throwError } from '@/domain/test'
import { LoadAccountByTokenSpy } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockReturnValueOnce(null)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenSpy, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  it('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(success({ accountId: loadAccountByTokenSpy.accountModel.id }))
  })

  it('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

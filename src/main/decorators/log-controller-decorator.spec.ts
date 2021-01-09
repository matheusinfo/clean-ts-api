import faker from 'faker'
import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, success } from '@/presentation/helpers/http/http-helper'
import { mockAccountModel } from '@/domain/test'
import { LogErrorRepositorySpy } from '@/data/test'

class ControllerSpy implements Controller {
  httpResponse = success(mockAccountModel())
  httpRequest: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return Promise.resolve(this.httpResponse)
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', async () => {
  it('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  it('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})

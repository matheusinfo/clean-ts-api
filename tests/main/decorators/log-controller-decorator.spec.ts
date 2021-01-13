import faker from 'faker'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, success } from '@/presentation/helpers/http/http-helper'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

class ControllerSpy implements Controller {
  httpResponse = success(faker.random.uuid())
  request: any

  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return Promise.resolve(this.httpResponse)
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockRequest = (): any => {
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
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  it('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    const request = mockRequest()
    await sut.handle(request)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})

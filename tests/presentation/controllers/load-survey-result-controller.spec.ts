import faker from 'faker'
import MockDate from 'mockdate'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadSurveyByIdSpy, LoadSurveyResultSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (): LoadSurveyResultController.Request => ({
  accountId: faker.random.uuid(),
  surveyId: faker.random.uuid()
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(loadSurveyByIdSpy, loadSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    loadSurveyResultSpy
  }
}

describe('', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyByIdSpy.id).toBe(request.surveyId)
  })

  it('Shoudl call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId)
    expect(loadSurveyResultSpy.accountId).toBe(request.accountId)
  })

  it('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockReturnValueOnce(null)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut, loadSurveyResultSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(success(loadSurveyResultSpy.surveyResultModel))
  })
})

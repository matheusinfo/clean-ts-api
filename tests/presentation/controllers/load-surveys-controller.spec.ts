import faker from 'faker'
import MockDate from 'mockdate'
import { LoadSurveysController } from '@/presentation/controllers'
import { noContent, serverError, success } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/tests/domain/mocks'
import { LoadSurveysSpy } from '@/tests/presentation/mocks'

const mockRequest = (): LoadSurveysController.Request => ({
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveys with correct id', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSurveysSpy.accountId).toBe(httpRequest.accountId)
  })

  it('Should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(success(loadSurveysSpy.surveyModel))
  })

  it('Should return 204 if LoadSurveysReturn empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    loadSurveysSpy.surveyModel = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if LoadSurveys throws', async () => {
    const { sut,loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

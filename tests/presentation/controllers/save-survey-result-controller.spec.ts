import MockDate from 'mockdate'
import faker from 'faker'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/../tests/domain/mocks'
import { LoadSurveyByIdSpy, SaveSurveyResultSpy } from '@/../tests/presentation/mocks'
import { HttpRequest } from '../protocols'

const mockRequest = (answer: string = null): HttpRequest => ({
  params: {
    surveyId: faker.random.uuid()
  },
  body: {
    answer
  },
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdSpy: LoadSurveyByIdSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadSurveyByIdSpy, saveSurveyResultSpy)
  return {
    sut,
    loadSurveyByIdSpy,
    saveSurveyResultSpy
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdSpy, 'loadById')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.params.surveyId)
  })

  it('Should return 403 LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockReturnValueOnce(null)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('Should return 403 if a invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        surveyId: 'any_survey_id'
      },
      body: {
        answer: 'invalid_answer'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  it('Should return 500 if LoadSurveyById throws', async () => {
    const { sut,loadSurveyByIdSpy } = makeSut()
    jest.spyOn(loadSurveyByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call SaveSurveyById with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultSpy, 'save')
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    await sut.handle(httpRequest)
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.accountId,
      date: new Date(),
      answer: httpRequest.body.answer
    })
  })

  it('Should return 500 if SaveSurveyById throws', async () => {
    const { sut,saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockImplementationOnce(throwError)
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadSurveyByIdSpy } = makeSut()
    const httpRequest = mockRequest(loadSurveyByIdSpy.surveyModel.answers[0].answer)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(success(saveSurveyResultSpy.surveyResultModel))
  })
})

import MockDate from 'mockdate'
import faker from 'faker'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { LoadAnswersBySurveySpy, SaveSurveyResultSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockRequest = (answer: string = null): SaveSurveyResultController.Request => ({
  surveyId: faker.random.uuid(),
  answer,
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswersBySurveySpy: LoadAnswersBySurveySpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveySpy = new LoadAnswersBySurveySpy()
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const sut = new SaveSurveyResultController(loadAnswersBySurveySpy, saveSurveyResultSpy)
  return {
    sut,
    loadAnswersBySurveySpy,
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

  it('Should call LoadAnswersBySurvey with correct values', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadAnswersBySurveySpy.id).toBe(request.surveyId)
  })

  it('Should return 403 LoadSurveyById returns a empty array', async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut()
    loadAnswersBySurveySpy.surveyModel = []
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('Should return 403 if a invalid answer is provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  it('Should return 500 if LoadSurveyById throws', async () => {
    const { sut,loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call SaveSurveyById with correct values', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultSpy, 'save')
    const request = mockRequest(loadAnswersBySurveySpy.surveyModel[0])
    await sut.handle(request)
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: request.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.answer
    })
  })

  it('Should return 500 if SaveSurveyById throws', async () => {
    const { sut,saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockImplementationOnce(throwError)
    const request = mockRequest(loadAnswersBySurveySpy.surveyModel[0])
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut()
    const request = mockRequest(loadAnswersBySurveySpy.surveyModel[0])
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(success(saveSurveyResultSpy.surveyResultModel))
  })
})

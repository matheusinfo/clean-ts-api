import MockDate from 'mockdate'
import { DbSaveSurveyResult } from '@/data/usecases'
import { throwError, mockSaveSurveyResultParams } from '@/tests/domain/mocks'
import { LoadSurveyResultRepositorySpy, SaveSurveyResultRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyRepositorySpy: SaveSurveyResultRepositorySpy
  loadSurveyRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveSurveyRepositorySpy = new SaveSurveyResultRepositorySpy()
  const loadSurveyRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbSaveSurveyResult(saveSurveyRepositorySpy, loadSurveyRepositorySpy)
  return {
    sut,
    saveSurveyRepositorySpy,
    loadSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call SaveSurveyRepository with correct values', async () => {
    const { sut, saveSurveyRepositorySpy } = makeSut()
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSurveyRepositorySpy.saveSurveyResultParams).toBe(surveyResultData)
  })

  it('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(loadSurveyRepositorySpy.surveyId).toBe(surveyResultData.surveyId)
  })

  it('Should throw if SaveSurveyRepository throws', async () => {
    const { sut, saveSurveyRepositorySpy } = makeSut()
    jest.spyOn(saveSurveyRepositorySpy, 'save').mockImplementationOnce(throwError)
    const surveyResultData = mockSaveSurveyResultParams()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
    const surveyResultData = mockSaveSurveyResultParams()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return SurveyResult on success', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const surveyResultData = mockSaveSurveyResultParams()
    const surveyResult = await sut.save(surveyResultData)
    expect(surveyResult).toEqual(loadSurveyRepositorySpy.surveyResultModel)
  })
})

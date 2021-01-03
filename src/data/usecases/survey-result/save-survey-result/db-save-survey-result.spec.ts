import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { throwError, mockSaveSurveyResultParams, mockSaveSurveyResultModel } from '@/domain/test'
import { mockSaveSurveyRepository } from '@/data/test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyRepositoryStub = mockSaveSurveyRepository()
  const sut = new DbSaveSurveyResult(saveSurveyRepositoryStub)
  return {
    sut,
    saveSurveyRepositoryStub
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
    const { sut, saveSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(saveSurveyRepositoryStub, 'save')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(surveyResultData)
  })

  it('Should throw if SaveSurveyRepository throws', async () => {
    const { sut, saveSurveyRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyRepositoryStub, 'save').mockImplementationOnce(throwError)
    const surveyResultData = mockSaveSurveyResultParams()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = mockSaveSurveyResultParams()
    const surveyResult = await sut.save(surveyResultData)
    expect(surveyResult).toEqual(mockSaveSurveyResultModel())
  })
})

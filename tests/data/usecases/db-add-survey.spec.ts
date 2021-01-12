import MockDate from 'mockdate'
import { DbAddSurvey } from '@/data/usecases'
import { AddSurveyRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddSurveyParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.addSurveyParams).toBe(surveyData)
  })

  it('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)
    const surveyData = mockAddSurveyParams()
    const promise = sut.add(surveyData)
    await expect(promise).rejects.toThrow()
  })
})

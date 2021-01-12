import faker from 'faker'
import MockDate from 'mockdate'
import { DbLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyByIdRepositorySpy, LoadSurveyResultRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string
let accountId: string

describe('DbLoadSurveyResult Usecase', () => {
  beforeEach(() => {
    surveyId = faker.random.uuid()
    accountId = faker.random.uuid()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load(surveyId, accountId)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyId)
    expect(loadSurveyResultRepositorySpy.accountId).toBe(accountId)
  })

  it('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    await sut.load(surveyId, accountId)
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  it('Should return a surveyResultModel with all answer with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositorySpy, loadSurveyResultRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    const surveyResult = await sut.load(surveyId, accountId)
    const { surveyModel } = loadSurveyByIdRepositorySpy
    expect(surveyResult).toEqual({
      surveyId: surveyModel.id,
      question: surveyModel.question,
      date: surveyModel.date,
      answers: surveyModel.answers.map(answer => Object.assign({}, answer, {
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }))
    })
  })

  it('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementation(throwError)
    const promise = sut.load(surveyId, accountId)
    await expect(promise).rejects.toThrow()
  })

  it('Should return surveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.load(surveyId, accountId)
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })
})

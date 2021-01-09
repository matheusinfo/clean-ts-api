import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-suveys'
import { throwError } from '@/domain/test'
import { LoadSurveysRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositorySpy, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('Should return a list of surveys on success', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(loadSurveysRepositorySpy.surveysModels)
  })

  it('Shoudl throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})

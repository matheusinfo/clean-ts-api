import faker from 'faker'
import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadSurveyByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbLoadSurveys', () => {
  beforeEach(() => {
    surveyId = faker.random.uuid()
  })

  it('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadAnswers(surveyId)
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  it('Should return answers on success', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([
      loadSurveyByIdRepositorySpy.surveyModel.answers[0].answer,
      loadSurveyByIdRepositorySpy.surveyModel.answers[1].answer
    ])
  })

  it('Should return empty array if LoadSurveyByRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyByIdRepositorySpy.surveyModel = null
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([])
  })

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})

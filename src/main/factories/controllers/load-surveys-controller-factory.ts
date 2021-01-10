import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/db-load-surveys-factory'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(loadSurveysController)
}

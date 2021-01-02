import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/load-surveys/db-load-surveys-factory'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controller/load-surveys/load-surveys-controller'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(loadSurveysController)
}

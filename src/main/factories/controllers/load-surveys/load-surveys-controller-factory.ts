import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../presentation/controller/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '../../usecases/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(loadSurveysController)
}

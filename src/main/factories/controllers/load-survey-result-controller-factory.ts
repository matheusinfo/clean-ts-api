import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/db-load-survey-result-factory'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbCheckSurveyById } from '../usecases'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResult = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResult)
}

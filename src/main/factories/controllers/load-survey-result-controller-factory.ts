import { LoadSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/db-load-survey-result-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResult = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResult)
}

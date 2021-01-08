import { LoadSurveyResultController } from '@/presentation/controller/load-survey-result/load-survey-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/load-survey-result/db-load-survey-result-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/load-survey-by-id/db-load-survey-by-id-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResult = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResult)
}

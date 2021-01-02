import { SaveSurveyResultController } from '@/presentation/controller/survey-result/save-survey-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '../../usecases/load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbSaveSurveyResult } from '../../usecases/survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResult = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResult)
}

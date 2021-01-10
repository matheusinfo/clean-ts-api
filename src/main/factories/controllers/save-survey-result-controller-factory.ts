import { SaveSurveyResultController } from '@/presentation/controllers/save-survey-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../decorators/log/log-controller-decorator-factory'
import { makeDbLoadSurveyById, makeDbSaveSurveyResult } from '../usecases'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResult = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResult)
}

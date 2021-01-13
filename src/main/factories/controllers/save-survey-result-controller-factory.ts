import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbLoadAnswersBySurvey, makeDbSaveSurveyResult } from '@/main/factories/usecases'
import { SaveSurveyResultController } from '@/presentation/controllers/save-survey-result-controller'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResult = new SaveSurveyResultController(makeDbLoadAnswersBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResult)
}

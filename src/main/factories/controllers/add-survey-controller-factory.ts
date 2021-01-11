import { makeAddSurveyValidation } from './add-survey-controller-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log/log-controller-decorator-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/db-add-survey-factory'
import { AddSurveyController } from '@/presentation/controllers/add-survey-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}

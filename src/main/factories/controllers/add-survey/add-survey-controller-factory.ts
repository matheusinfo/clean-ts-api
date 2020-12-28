import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-controller-validation-factory'
import { AddSurveyController } from '../../../../presentation/controller/add-survey/add-survey-controller'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}

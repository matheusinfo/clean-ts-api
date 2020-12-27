import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'
import { badRequest } from '../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

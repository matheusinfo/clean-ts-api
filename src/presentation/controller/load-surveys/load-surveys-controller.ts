import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-protocols'
import { success } from '../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return success(surveys)
  }
}

import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, success } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)
      return success(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { HttpRequest, HttpResponse, Middleware } from '../../protocols'
import { forbidden } from '../../helpers/http/http-helper'
import { AccessDeniedError } from '../../errors'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}

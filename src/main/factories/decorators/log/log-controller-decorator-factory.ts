import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols/controller'
import { LogMongoRepository } from '@/infra/db/mongodb/log-mongo-repository'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}

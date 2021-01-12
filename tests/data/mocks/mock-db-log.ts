import { LogErrorRepository } from '@/data/protocols/db/log-error-repository'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}

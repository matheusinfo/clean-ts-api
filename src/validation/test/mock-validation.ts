import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  input: string

  validate (input: any): Error {
    this.input = input
    return null
  }
}

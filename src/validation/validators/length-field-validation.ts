import { LengthError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class LengthField implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName].length < 4) {
      return new LengthError(this.fieldName)
    }
  }
}

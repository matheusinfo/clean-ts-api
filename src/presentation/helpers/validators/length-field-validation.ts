import { LengthError } from '../../errors'
import { Validation } from '../../protocols/validation'

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

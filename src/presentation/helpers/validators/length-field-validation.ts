import { LengthError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class LengthField implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (input[this.fieldName].length < 4) {
      return new LengthError(this.fieldName)
    }
  }
}

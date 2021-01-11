import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}
let field: string
let wrongField: string

describe('CompareField Validation', () => {
  beforeEach(() => {
    field = faker.random.uuid()
    wrongField = faker.random.uuid()
  })

  it('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field,
      fieldToCompare: wrongField
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field,
      fieldToCompare: field
    })
    expect(error).toBeFalsy()
  })
})

import faker from 'faker'
import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

let value: string

describe('RequiredField Validation', () => {
  beforeEach(() => {
    value = faker.random.uuid()
  })

  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ wrong_field: value })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: value })
    expect(error).toBeFalsy()
  })
})

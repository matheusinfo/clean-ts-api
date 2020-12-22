import { LengthError } from '../../errors'
import { LengthField } from './length-field-validation'

const makeSut = (): LengthField => {
  return new LengthField('password')
}

describe('LengthField Validation', () => {
  it('Should return a LengthError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      password: '123'
    })
    expect(error).toEqual(new LengthError('password'))
  })

  it('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      password: '1234'
    })
    expect(error).toBeFalsy()
  })
})

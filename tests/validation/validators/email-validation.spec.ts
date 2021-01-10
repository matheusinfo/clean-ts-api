import { EmailValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidationSpy } from '../mocks'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidationSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidationSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    const httpRequest = { email: 'any_email@mail.com' }
    sut.validate(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })

  it('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const httpRequest = { email: 'any_emailmail.com' }
    const httpResponse = sut.validate(httpRequest)
    expect(httpResponse).toEqual(new InvalidParamError('email'))
  })

  it('Should return throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})

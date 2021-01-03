import { EmailValidation } from './email-validation'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { InvalidParamError } from '@/presentation/errors'
import { mockEmailValidator } from '@/validation/test'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = { email: 'any_email@mail.com' }
    sut.validate(httpRequest)
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })

  it('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = { email: 'any_emailmail.com' }
    const httpResponse = sut.validate(httpRequest)
    expect(httpResponse).toEqual(new InvalidParamError('email'))
  })

  it('Should return throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})

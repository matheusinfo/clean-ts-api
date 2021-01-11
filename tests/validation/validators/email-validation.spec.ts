import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidation } from '@/validation/validators'
import { EmailValidationSpy } from '@/tests/validation/mocks'

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

let email: string

describe('Email Validation', () => {
  beforeEach(() => {
    email = faker.internet.email()
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    const httpRequest = { email }
    sut.validate(httpRequest)
    expect(isValidSpy).toBeCalledWith(email)
  })

  it('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const httpRequest = { email }
    const httpResponse = sut.validate(httpRequest)
    expect(httpResponse).toEqual(new InvalidParamError('email'))
  })

  it('Should return throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})

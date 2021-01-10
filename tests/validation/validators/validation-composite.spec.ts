import { ValidationComposite } from '@/validation/validators'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '../../presentation/mocks'

type SutTypes = {
  sut: ValidationComposite
  validationSpys: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpys = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpys)
  return {
    sut,
    validationSpys
  }
}

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    jest.spyOn(validationSpys[1], 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if validation succeds', () => {
    const { sut } = makeSut()
    const error = sut.validate([])
    expect(error).toBeFalsy()
  })
})

import faker from 'faker'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hashedValue
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

let value: string
let hashedValue: string

describe('Bcrypt Adapter', () => {
  beforeEach(() => {
    value = faker.random.uuid()
    hashedValue = faker.random.uuid()
  })

  describe('HASH()', () => {
    it('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(value)
      expect(hashSpy).toHaveBeenCalledWith(value, salt)
    })

    it('Should return a valid hash on hash succedss', async () => {
      const sut = makeSut()
      const hash = await sut.hash(value)
      expect(hash).toBe(hashedValue)
    })

    it('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash(value)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('COMPARE()', () => {
    it('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(value, hashedValue)
      expect(compareSpy).toHaveBeenCalledWith(value, hashedValue)
    })

    it('Should return true when compare succedss', async () => {
      const sut = makeSut()
      const isValid = await sut.compare(value, hashedValue)
      expect(isValid).toBe(true)
    })

    it('Should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isValid = await sut.compare(value, hashedValue)
      expect(isValid).toBe(false)
    })

    it('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare(value, hashedValue)
      await expect(promise).rejects.toThrow()
    })
  })
})

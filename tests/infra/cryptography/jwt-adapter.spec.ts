import faker from 'faker'
import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return token
  },

  async verify (token: string): Promise<string> {
    return 'any_value'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret)
}

let token: string
let id: string
let secret: string

describe('Jwt Adapter', () => {
  beforeEach(() => {
    id = faker.random.uuid()
    token = faker.random.uuid()
    secret = faker.random.uuid()
  })

  describe('ENCRYPT()', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(id)
      expect(signSpy).toHaveBeenCalledWith({ id: id }, secret)
    })

    it('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt(id)
      expect(accessToken).toBe(token)
    })

    it('Shoul throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt(id)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('DECRIPTY()', () => {
    it('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verify = jest.spyOn(jwt, 'verify')
      await sut.decrypt(token)
      expect(verify).toHaveBeenCalledWith(token, secret)
    })

    it('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt(token)
      expect(value).toBe('any_value')
    })

    it('Shoul throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt(token)
      await expect(promise).rejects.toThrow()
    })
  })
})

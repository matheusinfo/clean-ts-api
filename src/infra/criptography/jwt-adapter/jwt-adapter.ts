import jwt from 'jsonwebtoken'
import { TokenEncrypter } from '../../../data/protocols/criptography/token-encrypter'
import { TokenDecrypter } from '../../../data/protocols/criptography/token-decrypter'

export class JwtAdapter implements TokenEncrypter, TokenDecrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }
}

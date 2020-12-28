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

  async decrypt (token: string): Promise<string> {
    const value: any = await jwt.verify(token, this.secret)
    return value
  }
}

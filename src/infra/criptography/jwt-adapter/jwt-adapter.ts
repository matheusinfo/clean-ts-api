import jwt from 'jsonwebtoken'
import { TokenEncrypter } from '../../../data/protocols/criptography/token-encrypter'

export class JwtAdapter implements TokenEncrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}

import jwt from 'jsonwebtoken'
import { TokenEncrypter } from '../../../data/protocols/criptography/token-encrypter'

export class JwtAdapter implements TokenEncrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secret)
    return null
  }
}

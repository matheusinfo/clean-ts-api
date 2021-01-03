import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { TokenDecrypter } from '@/data/protocols/criptography/token-decrypter'
import { TokenEncrypter } from '@/data/protocols/criptography/token-encrypter'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new HasherStub()
}

export const mockTokenDecrypter = (): TokenDecrypter => {
  class TokenDecrypterStub implements TokenDecrypter {
    async decrypt (token: string): Promise<string> {
      return 'any_value'
    }
  }
  return new TokenDecrypterStub()
}

export const mockTokenEncrypter = (): TokenEncrypter => {
  class TokenEncrypterStub implements TokenEncrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }
  return new TokenEncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashComparerStub()
}

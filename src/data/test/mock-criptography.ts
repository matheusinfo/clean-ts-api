import faker from 'faker'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { TokenEncrypter } from '@/data/protocols/criptography/token-encrypter'
import { TokenDecrypter } from '@/data/protocols/criptography/token-decrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export class HasherSpy implements Hasher {
  plaintext = faker.random.uuid()
  value: string

  async hash (value: string): Promise<string> {
    this.value = value
    return this.plaintext
  }
}

export class TokenEncrypterSpy implements TokenEncrypter {
  ciphertext = faker.random.uuid()
  id: string

  async encrypt (id: string): Promise<string> {
    this.id = id
    return this.ciphertext
  }
}

export class TokenDecrypterSpy implements TokenDecrypter {
  plaintext = faker.random.uuid()
  token: string

  async decrypt (token: string): Promise<string> {
    this.token = token
    return this.plaintext
  }
}

export class HashComparerSpy implements HashComparer {
  value: string
  hash: string
  isValid = true

  async compare (value: string, hash: string): Promise<boolean> {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}

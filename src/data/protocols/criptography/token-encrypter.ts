export interface TokenEncrypter {
  encrypt (value: string): Promise<string>
}

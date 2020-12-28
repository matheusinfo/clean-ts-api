export interface TokenDecrypter {
  decrypt (token: string): Promise<string>
}

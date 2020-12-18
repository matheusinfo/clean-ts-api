export class LengthError extends Error {
  constructor (paramName: string) {
    super(`Length of ${paramName} is invalid`)
    this.name = 'LengthError'
  }
}

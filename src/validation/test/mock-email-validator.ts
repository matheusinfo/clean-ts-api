import { EmailValidator } from '@/validation/protocols/email-validator'

export class EmailValidationSpy implements EmailValidator {
  isEmailValid = true
  email: string

  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}

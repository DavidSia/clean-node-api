import { SignUpController } from './signup'

describe('SignUpController', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@test.com',
        password: '5454df6s54d',
        passwordConfirmation: '5454df6s54d'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})

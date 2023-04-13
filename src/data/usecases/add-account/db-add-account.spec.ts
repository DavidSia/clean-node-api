import { DbAddAccount } from './db-add-account'
import { type Encrypter } from '../../protocols/encrypter'

describe('DbAddAccount', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => { resolve('hashed_password') })
      }
    }
    const encrytperStub = new EncrypterStub()
    const sut = new DbAddAccount(encrytperStub)
    const account = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const encryptSpy = jest.spyOn(encrytperStub, 'encrypt')
    await sut.add(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})

import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should calls bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should returns a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toEqual('hash')
  })
  test('Should throws if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      new Promise<void>((resolve, reject) => {
        reject(new Error())
      }) as never
    )

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})

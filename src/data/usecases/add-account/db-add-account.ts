import { type AddAccountRepository } from '../../protocols/add-account-repository'
import { type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from './protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const fakeAccount: AccountModel = {
      id: '',
      name: '',
      email: ''
    }
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

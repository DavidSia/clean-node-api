import { type AccountModel, type AddAccount, type AddAccountModel, type Encrypter } from './protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const fakeAccount: AccountModel = {
      id: '',
      name: '',
      email: ''
    }
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

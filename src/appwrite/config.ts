import conf from "@/conf/config"
import { Account, Client, ID } from "appwrite"

type CreateUserAccount = {
  email: string
  password: string
  name: string
}

type LoginUserAccount = {
  email: string
  password: string
}

const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)

export const account = new Account(appwriteClient)

export class AppwriteService {
  //create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      // Register user
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      )
      if (userAccount) {
        return this.login({ email, password })
      } else {
        //any errors will be handled on frontend
        return userAccount
      }
    } catch (error) {
      console.log("AppwriteService/CreateUserAccount: error =", error)
      throw error
    }
  }
  async login({ email, password }: LoginUserAccount) {
    //login user
    try {
      return await account.createEmailSession(email, password)
    } catch (error) {
      console.log("AppwriteService/Login: error =", error)
      throw error
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser()
      return Boolean(data)
    } catch (error) {
      console.log("AppwriteService/isLoggedIn: error =", error)
      return false
    }
  }

  async getCurrentUser() {
    try {
      return account.get()
    } catch (error) {
      console.log("AppwriteService/getCurrentUser(): error =", error)
    }
    return null
  }

  async logout() {
    try {
      return await account.deleteSession("current")
    } catch (error) {
      console.log("AppwriteService/Logout: error =", error)
    }
  }
}

const appwriteService = new AppwriteService()

export default appwriteService

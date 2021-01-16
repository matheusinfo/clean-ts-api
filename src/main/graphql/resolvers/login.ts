import { makeLoginController } from '@/main/factories'
import { adaptResolver } from '@/main/adapters/apollo/apollo-server-resolver-adapter'

export default {
  Query: {
    login: async (parent: any, args: any) => {
      const loginController = makeLoginController()
      return adaptResolver(loginController, args)
    }
  }
}

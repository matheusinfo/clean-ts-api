import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories'
import { adaptResolver } from '@/main/adapters/apollo/apollo-server-resolver-adapter'

export default {
  Query: {
    surveys: async () => {
      const loadSurveysController = makeLoadSurveysController()
      return adaptResolver(loadSurveysController)
    }
  },

  Mutation: {
    addSurvey: async (parent: any, args: any) => {
      const addSurveyController = makeAddSurveyController()
      return adaptResolver(addSurveyController, args)
    }
  }
}

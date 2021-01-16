import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories'
import { adaptResolver } from '@/main/adapters/apollo/apollo-server-resolver-adapter'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => {
      const loadSurveysController = makeLoadSurveysController()
      return adaptResolver(loadSurveysController, args, context)
    }
  },

  Mutation: {
    addSurvey: async (parent: any, args: any, context: any) => {
      const addSurveyController = makeAddSurveyController()
      return adaptResolver(addSurveyController, args, context)
    }
  }
}

import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'
import { adaptResolver } from '@/main/adapters/apollo/apollo-server-resolver-adapter'

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => {
      const loadSurveysResultController = makeLoadSurveyResultController()
      return adaptResolver(loadSurveysResultController, args, context)
    }
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => {
      const saveSurveysResultController = makeSaveSurveyResultController()
      return adaptResolver(saveSurveysResultController, args, context)
    }
  }
}

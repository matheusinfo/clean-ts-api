import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'
import { adaptResolver } from '@/main/adapters/apollo/apollo-server-resolver-adapter'

export default {
  Query: {
    surveyResult: async (parent: any, args: any) => {
      const loadSurveysResultController = makeLoadSurveyResultController()
      return adaptResolver(loadSurveysResultController, args)
    }
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any) => {
      const saveSurveysResultController = makeSaveSurveyResultController()
      return adaptResolver(saveSurveysResultController, args)
    }
  }
}

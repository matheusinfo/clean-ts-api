import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { DbLoadSurveys } from '@/data/usecases/db-load-suveys'
import { LoadSurveys } from '@/domain/usecases/load-surveys'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}

import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { DbLoadSurveyById } from '@/data/usecases/db-load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const loadSurveyByIdMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(loadSurveyByIdMongoRepository)
}

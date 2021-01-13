import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { CheckSurveyById } from '@/domain/usecases'
import { DbCheckSurveyById } from '@/data/usecases'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const checkSurveyByIdMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(checkSurveyByIdMongoRepository)
}

import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { DbLoadAnswersBySurvey } from '@/data/usecases/db-load-answers-survey-by-id'
import { LoadAnswersBySurvey } from '@/domain/usecases/load-answers-by-survey'

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const loadSurveyByIdMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(loadSurveyByIdMongoRepository)
}

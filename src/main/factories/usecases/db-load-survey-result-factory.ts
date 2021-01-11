import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb'
import { DbLoadSurveyResult } from '@/data/usecases'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const loadSurveyResultRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, loadSurveyResultRepository)
}

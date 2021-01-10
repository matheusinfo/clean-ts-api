import { SurveyResultMongoRepository } from '@/infra/db/mongodb'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { DbLoadSurveyResult } from '@/data/usecases'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const loadSurveyResultRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, loadSurveyResultRepository)
}

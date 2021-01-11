import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository'
import { DbSaveSurveyResult } from '@/data/usecases/db-save-survey-result'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}

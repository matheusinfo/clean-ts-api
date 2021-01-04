export const addSurveyParamsParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswerSchema'
      }
    }
  },
  required: ['question', 'answers']
}

export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswerSchema'
      }
    },
    date: {
      type: 'string'
    },
    didAnswer: {
      type: 'boolean'
    }
  },
  required: ['id', 'question', 'answers', 'date', 'didAnswer']
}

export const surveyAnswerSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    },
    image: {
      type: 'string'
    }
  },
  required: ['answer']
}

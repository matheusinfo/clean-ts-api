export const notFound = {
  description: 'Rota não encontrada',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}

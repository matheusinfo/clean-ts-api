import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'
import { GraphQLError } from 'graphql'

const checkError = (error: GraphQLError, erroName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === erroName)
}

const handleErros = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

export default (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [{
      requestDidStart: () => ({
        willSendResponse: ({ response, errors }) => handleErros(response, errors)
      })
    }]
  })
  server.applyMiddleware({ app })
}

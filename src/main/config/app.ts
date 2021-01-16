import express from 'express'
import middlewares from './middlewares'
import routes from './routes'
import staticFiles from './static-files'
import swagger from './swagger'
import apolloServer from './apollo-server'

const app = express()
apolloServer(app)
swagger(app)
staticFiles(app)
middlewares(app)
routes(app)

export default app

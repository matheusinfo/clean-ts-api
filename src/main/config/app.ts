import express from 'express'
import middlewares from './middlewares'
import routes from './routes'
import staticFiles from './static-files'
import swagger from './config-swagger'

const app = express()
swagger(app)
staticFiles(app)
middlewares(app)
routes(app)

export default app

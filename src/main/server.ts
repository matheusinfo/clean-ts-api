import app from './config/app'
import { MongoHelper } from '../infra/db/mongodb/helper/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)

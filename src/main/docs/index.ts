import paths from './path'
import schemas from './schemas'
import components from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Typescript API',
    description: 'API do curso do Mango para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'GPL 3.0 or later',
    url: 'https://opensource.org/licenses/GPL-3.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Autenticação'
  },{
    name: 'Enquete'
  }],
  paths,
  schemas,
  components
}

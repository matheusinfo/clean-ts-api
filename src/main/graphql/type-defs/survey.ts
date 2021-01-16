import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        surveys: [Survey!]! @auth
    }

    type SurveyAnswer {
        answer: String!
        image: String
    }

    type Survey {
        id: ID!
        question: String!
        answers: [SurveyAnswer!]!
        date: DateTime
        didAnswer: Boolean
    }
`

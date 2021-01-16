import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        surveys: [Survey!]! @auth
    }

    extend type Mutation {
        addSurvey (question: String!, answers: [Answers!]!): Boolean @auth
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

    input Answers {
        answer: String!
        image: String
    }
`

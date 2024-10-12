export const schema = gql`
  type Demo3 {
    id: ID!
    content: String!
    transformedContent: String!
    reference: String! @withStorage
  }

  input Demo3Input {
    content: String!
  }

  type Mutation {
    demo3(input: Demo3Input!): Demo3! @skipAuth
  }
`

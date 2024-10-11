export const schema = gql`
  type Demo2 {
    content: String!
    transformedContent: String!
    reference: String!
    url: String! @withStorage
  }

  input Demo2Input {
    content: String!
  }

  type Mutation {
    demo2(input: Demo2Input!): Demo2! @skipAuth
  }
`

export const schema = gql`
  type Demo5Image {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    url: String! @withStorage
  }

  type Demo5 {
    images: [Demo5Image!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo5Input {
    images: [File!]!
  }

  type Mutation {
    demo5(input: Demo5Input!): Demo5! @skipAuth
  }
  type Query {
    demo5Images: [Demo5Image!]! @skipAuth
  }
`

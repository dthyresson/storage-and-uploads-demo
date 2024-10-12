export const schema = gql`
  type Demo6Image {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    url: String! @withStorage(format: DATA_URI)
  }

  type Demo6 {
    images: [Demo6Image!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo6Input {
    images: [File!]!
  }

  type Mutation {
    demo6(input: Demo6Input!): Demo6!
      @skipAuth
      @requireUploadToken(fields: ["images"], variable: "input")
  }

  type Query {
    demo6Images: [Demo6Image!]! @skipAuth
  }
`

export const schema = gql`
  # Demo1 Uploads a file and returns the file metadata
  type Demo1 {
    id: ID!
    name: String!
    type: String!
    size: Int!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo1Input {
    uploadedFiles: [File!]!
  }

  type Mutation {
    demo1(input: Demo1Input!): Demo1 @skipAuth
  }
`

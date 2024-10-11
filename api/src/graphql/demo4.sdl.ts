export const schema = gql`
  # Demo1 Uploads a file and returns the file metadata
  type Demo4Image {
    id: ID!
    name: String!
    type: String!
    size: Int!
    url: String! @withStorage
  }

  type Demo4 {
    images: [Demo4Image!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo4Input {
    images: [File!]!
  }

  type Mutation {
    demo4(input: Demo4Input!): Demo4 @skipAuth
  }
`

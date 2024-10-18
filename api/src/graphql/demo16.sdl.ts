export const schema = gql`
  # Demo1 Uploads files with validation and returns each file metadata and require auth
  type Demo16 {
    id: ID!
    name: String!
    type: String!
    size: Int!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo16Input {
    uploadedFiles: [File!]!
  }

  type Mutation {
    demo16(input: Demo16Input!): [Demo16!]!
      @requireAuth
      @requireUploadToken(fields: ["uploadedFiles"], variable: "input")
  }
`

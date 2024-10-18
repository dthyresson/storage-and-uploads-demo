export const schema = gql`
  # Demo1 Uploads files with validation and returns each file metadata
  type Demo15 {
    id: ID!
    name: String!
    type: String!
    size: Int!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo15Input {
    uploadedFiles: [File!]!
  }

  type Mutation {
    demo15(input: Demo15Input!): [Demo15!]!
      @skipAuth
      @requireUploadToken(fields: ["uploadedFiles"], variable: "input")
  }
`

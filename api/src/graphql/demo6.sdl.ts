export const schema = gql`
  type Demo6Attachment implements Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    reference: String! @withStorage(format: DATA_URI)
    variant: String!
  }

  type Demo6 {
    attachments: [Demo6Attachment!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo6Input {
    attachments: [File!]!
  }

  type Mutation {
    demo6(input: Demo6Input!): Demo6!
      @skipAuth
      @requireUploadToken(fields: ["attachments"], variable: "input")
  }

  type Query {
    demo6Attachments: [Demo6Attachment!]! @skipAuth
  }
`

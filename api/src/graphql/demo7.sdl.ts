export const schema = gql`
  type Demo7Attachment implements Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    reference: String! @withStorage(adapter: S3)
    variant: String!
  }

  type Demo7 {
    attachments: [Demo7Attachment!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo7Input {
    attachments: [File!]!
  }

  type Mutation {
    demo7(input: Demo7Input!): Demo7!
      @skipAuth
      @requireUploadToken(fields: ["attachments"], variable: "input")
  }

  type Query {
    demo7Attachments: [Demo7Attachment!]! @skipAuth
  }
`

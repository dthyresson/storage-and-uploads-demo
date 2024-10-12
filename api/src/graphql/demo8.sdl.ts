export const schema = gql`
  type Demo8Attachment implements Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    reference: String! @withStorage
    variant: String!
  }

  type Demo8 {
    attachments: [Demo8Attachment!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo8Input {
    attachments: [File!]!
  }

  type Mutation {
    demo8(input: Demo8Input!): Demo8!
      @skipAuth
      @requireUploadToken(fields: ["attachments"], variable: "input")
  }

  type Query {
    demo8Attachments: [Demo8Attachment!]! @skipAuth
  }
`

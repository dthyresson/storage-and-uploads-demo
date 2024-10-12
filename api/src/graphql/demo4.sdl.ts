export const schema = gql`
  type Demo4Attachment implements Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    reference: String! @withStorage
  }
  type Demo4 {
    attachments: [Demo4Attachment!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo4Input {
    attachments: [File!]!
  }

  type Mutation {
    demo4(input: Demo4Input!): Demo4 @skipAuth
  }
`

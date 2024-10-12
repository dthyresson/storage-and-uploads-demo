export const schema = gql`
  type Demo5Attachment implements Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    type: String!
    size: Int!
    reference: String! @withStorage
    variant: String!
  }
  type Demo5 {
    attachments: [Demo5Attachment!]!
  }

  # The web will send a collection of files, so we need to accept a list of files
  input Demo5Input {
    attachments: [File!]!
  }

  type Mutation {
    demo5(input: Demo5Input!): Demo5! @skipAuth
  }

  type Query {
    demo5Attachments: [Demo5Attachment!]! @skipAuth
  }
`

export const schema = gql`
  interface Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    type: String
    size: Int
    reference: String! @withStorage
  }
`

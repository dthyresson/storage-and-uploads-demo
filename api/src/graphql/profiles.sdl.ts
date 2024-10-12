export const schema = gql`
  type Avatar implements Attachment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    type: String
    size: Int
    reference: String! @withStorage
    variant: String!
  }

  type Profile {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    firstName: String!
    lastName: String!
    avatars: [Avatar!]!
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: String!): Profile @requireAuth
  }

  input CreateProfileInput {
    firstName: String!
    lastName: String!
    avatar: [File!]!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
  }
`

export const schema = gql`
  type Post {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    content: String!
    ogImage: String @withStorage(adapter: OG)
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: String!): Post @skipAuth
  }
`

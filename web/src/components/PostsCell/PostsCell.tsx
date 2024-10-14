import type { PostsQuery, PostsQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<PostsQuery, PostsQueryVariables> = gql`
  query PostsQuery {
    posts {
      id
      title
      content
      ogImage
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<PostsQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} to={routes.demo13Post({ id: post.id })}>
          <div
            key={post.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            {post.ogImage && (
              <img
                src={post.ogImage}
                alt={post.title}
                className="h-48 w-full object-contain"
              />
            )}
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

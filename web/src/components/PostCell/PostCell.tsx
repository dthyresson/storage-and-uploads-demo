import type { FindPostQuery, FindPostQueryVariables } from 'types/graphql'

import { Metadata } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<FindPostQuery, FindPostQueryVariables> =
  gql`
    query FindPostQuery($id: String!) {
      post: post(id: $id) {
        id
        title
        content
        ogImage
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPostQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  post,
}: CellSuccessProps<FindPostQuery, FindPostQueryVariables>) => {
  return (
    <>
      <Metadata
        title={post.title}
        description={post.content}
        ogImage={post.ogImage}
      />
      <article className="mx-auto mt-8 max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
        {post.ogImage && (
          <aside className="mb-6">
            <img
              src={post.ogImage}
              alt={post.title}
              className="h-auto w-full rounded-lg shadow-md"
            />
          </aside>
        )}
        <div className="leading-8">{post.content}</div>
      </article>
    </>
  )
}

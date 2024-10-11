import type {
  // CellSuccessProps,
  CellFailureProps,
  // TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY = gql`
  query Demo5ImagesQuery {
    demo5Images {
      id
      createdAt
      updatedAt
      url
      name
      type
      size
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ demo5Images }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {demo5Images.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-lg border shadow-md"
        >
          <img
            src={item.url}
            alt={item.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 text-sm text-gray-500">
            <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
            <p className="text-gray-700">ID: {item.id}</p>
            <p className="text-gray-700">Created At: {item.createdAt}</p>
            <p className="text-gray-700">Updated At: {item.updatedAt}</p>
            <p className="text-gray-700">Type: {item.type}</p>
            <p className="text-gray-700">Size: {item.size}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

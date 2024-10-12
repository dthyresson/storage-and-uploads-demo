import type {
  // CellSuccessProps,
  CellFailureProps,
  // TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY = gql`
  query Demo7AttachmentsQuery {
    demo7Attachments {
      id
      createdAt
      updatedAt
      reference
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

export const Success = ({ demo7Attachments }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {demo7Attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="overflow-hidden rounded-lg border shadow-md"
        >
          <img
            src={attachment.reference}
            alt={attachment.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 text-sm text-gray-500">
            <h3 className="mb-2 text-lg font-bold">{attachment.name}</h3>
            <p className="text-gray-700">ID: {attachment.id}</p>
            <p className="text-gray-700">Created At: {attachment.createdAt}</p>
            <p className="text-gray-700">Updated At: {attachment.updatedAt}</p>
            <p className="text-gray-700">Type: {attachment.reference}</p>
            <p className="text-gray-700">Type: {attachment.type}</p>
            <p className="text-gray-700">Size: {attachment.size}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

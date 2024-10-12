import type {
  // CellSuccessProps,
  CellFailureProps,
  // TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY = gql`
  query Demo8AttachmentsQuery {
    demo8Attachments {
      id
      createdAt
      updatedAt
      reference
      variant
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

export const Success = ({ demo8Attachments }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {demo8Attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="overflow-hidden rounded-lg border shadow-md"
        >
          <img
            src={attachment.reference}
            alt={attachment.name}
            className="object-contain"
          />
          <div className="p-4 text-sm text-gray-500">
            <h3 className="mb-2 text-lg font-bold">{attachment.name}</h3>
            <h4 className="mb-2 text-lg text-gray-700">
              Variant: {attachment.variant}
            </h4>
            <p className="text-gray-700">ID: {attachment.id}</p>
            <p className="text-gray-700">Created At: {attachment.createdAt}</p>
            <p className="text-gray-700">Updated At: {attachment.updatedAt}</p>
            <p className="text-gray-700">Reference: {attachment.reference}</p>
            <p className="text-gray-700">Type: {attachment.type}</p>
            <p className="text-gray-700">Size: {attachment.size}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

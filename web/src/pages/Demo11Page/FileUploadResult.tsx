export const FileUploadResult = ({ result }) => {
  return (
    result && (
      <div key={result.id} className="mb-4 rounded-lg bg-gray-100 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          File Metadata for {result.id}
        </h2>
        <ul className="space-y-2">
          <li>
            <strong className="font-medium">Name:</strong> {result.name}
          </li>
          <li>
            <strong className="font-medium">Type:</strong> {result.type}
          </li>
          <li>
            <strong className="font-medium">Size:</strong> {result.size} bytes
          </li>
        </ul>
      </div>
    )
  )
}

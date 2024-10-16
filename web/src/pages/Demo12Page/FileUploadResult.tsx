export const FileUploadResult = ({ result }) => {
  const files = result?.attachments
  return (
    files &&
    files.length > 0 &&
    files.map((file) => (
      <div key={file.id} className="mb-4 rounded-lg bg-gray-100 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          File Metadata for {file.id}
        </h2>
        <ul className="space-y-2">
          <li>
            <strong className="font-medium">Name:</strong> {file.name}
          </li>
          <li>
            <strong className="font-medium">Type:</strong> {file.type}
          </li>
          <li>
            <strong className="font-medium">Size:</strong> {file.size} bytes
          </li>
        </ul>
      </div>
    ))
  )
}

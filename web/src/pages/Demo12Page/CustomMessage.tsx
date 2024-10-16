import { useRedwoodUploadsContext } from '@redwoodjs/uploads-web'

export const CustomMessage = () => {
  const { isDragActive, isDragReject, isDragAccept } =
    useRedwoodUploadsContext()

  return (
    <div className="flex items-center justify-center">
      {(isDragActive || isDragAccept) && (
        <div className="text-green-500">Thanks for dropping your files!</div>
      )}
      {isDragReject && (
        <div className="text-red-500">
          Hmm, I don&apos;t think you can upload that.
        </div>
      )}
      {!isDragActive && !isDragAccept && !isDragReject && (
        <div className="text-gray-500">
          Drag some of your files to upload here
        </div>
      )}
    </div>
  )
}

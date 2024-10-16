import {
  getReadableErrorMessage,
  useRedwoodUploadsContext,
} from '@redwoodjs/uploads-web'

export const CustomPreviewFileRejections = () => {
  const { fileRejections } = useRedwoodUploadsContext()

  return (
    fileRejections?.length > 0 && (
      <div>
        <h4 className="text-lg font-semibold">I reject you!</h4>
        {fileRejections.map((reject) => (
          <div className="text-purple-500" key={reject.file.name}>
            {reject.file.name}
            <div className="text-sm text-gray-500">
              {reject.errors.map((error) => (
                <div key={`${error.code}-${reject.file.name}`}>
                  {getReadableErrorMessage(
                    reject.file,
                    error.code,
                    error.message
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  )
}

import {
  formatFileSize,
  useRedwoodUploadsContext,
} from '@redwoodjs/uploads-web'

export const CustomPreviewFiles = () => {
  const { acceptedFiles } = useRedwoodUploadsContext()

  return (
    acceptedFiles?.length > 0 && (
      <div className="mt-4 flex flex-col gap-2">
        <h4 className="text-lg font-semibold">I approve!</h4>
        {acceptedFiles.map((file) => {
          const isImage = file.type.startsWith('image/')
          const previewUrl = isImage ? URL.createObjectURL(file) : null
          return (
            <div key={file.name} className="flex items-center gap-2">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="h-20 w-20 rounded-md object-cover shadow-md"
                  onLoad={() => URL.revokeObjectURL(previewUrl)}
                />
              )}
              {file.name}
              <div className="text-sm text-gray-500">
                {formatFileSize(file.size)}, {file.type}
              </div>
            </div>
          )
        })}
      </div>
    )
  )
}

import { useState, useCallback } from 'react'

import { Form, Submit } from '@redwoodjs/forms'
import {
  RedwoodUploadsComponent,
  getReadableErrorMessage,
  formatFileSize,
  ACCEPTED_IMAGE_TYPES,
  RedwoodUploadsButton,
  useRedwoodUploadsContext,
} from '@redwoodjs/uploads-web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

const DEMO4_MUTATION = gql`
  mutation Demo12($input: Demo4Input!) {
    demo12: demo4(input: $input) {
      attachments {
        id
        name
        type
        size
        reference
      }
    }
  }
`

const CustomPreviewFiles = () => {
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

const CustomPreviewFileRejections = () => {
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

const FilUploadResult = ({ result }) => {
  return (
    result &&
    result.attachments.length > 0 &&
    result.attachments.map((attachment) => (
      <div key={attachment.id} className="mb-4 rounded-lg bg-gray-100 p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          File Metadata for {attachment.id}
        </h2>
        <ul className="space-y-2">
          <li>
            <strong className="font-medium">Name:</strong> {attachment.name}
          </li>
          <li>
            <strong className="font-medium">Type:</strong> {attachment.type}
          </li>
          <li>
            <strong className="font-medium">Size:</strong> {attachment.size}{' '}
            bytes
          </li>
        </ul>
      </div>
    ))
  )
}

const Demo12Page = () => {
  const [resetFiles, setResetFiles] = useState<(() => void) | null>(null)

  const onResetFiles = useCallback((resetFunction: () => void) => {
    setResetFiles(() => resetFunction)
  }, [])

  const [result, setResult] = useState(null)
  const [files, setFiles] = useState([])

  const [demo12, { loading, error }] = useMutation(DEMO4_MUTATION, {
    onCompleted: (data) => {
      if (resetFiles) {
        resetFiles()
      }

      toast.success(
        `${data.demo12.attachments.length} files uploaded successfully!`
      )
      setResult(data.demo12)
    },
    onError: (error) => {
      setResult([])
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    if (files.length === 0) {
      toast.error('No files selected')
      return
    }

    try {
      await demo12({
        variables: {
          input: {
            ...data,
            attachments: files,
          },
        },
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Demo index={12} />

        {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

        <Form onSubmit={onSubmit} className="mb-8 space-y-4">
          <RedwoodUploadsComponent
            name="attachments"
            className="h-40 w-full items-center justify-center rounded-md border-2 border-dotted border-gray-300 bg-gray-50"
            fileConstraints={{
              maxSize: 1.2 * 1024 * 1024, // 1.2MB
              maxFiles: 4,
              accept: ACCEPTED_IMAGE_TYPES,
            }}
            setFiles={setFiles}
            onResetFiles={onResetFiles}
            dropzoneContent={
              <div className="flex h-40 items-center justify-center text-neutral-500">
                <RedwoodUploadsButton className="my-8 rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
                  Add File
                </RedwoodUploadsButton>
              </div>
            }
            messageContent={
              <div className="flex items-center justify-center text-neutral-500">
                Drop files here
              </div>
            }
            noClick={true}
            disabled={loading}
          >
            <CustomPreviewFiles />
            <CustomPreviewFileRejections />
          </RedwoodUploadsComponent>

          <Submit
            disabled={loading}
            className="rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-600
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Submit>
        </Form>

        <FilUploadResult result={result} />
      </div>
    </>
  )
}

export default Demo12Page

import { useState } from 'react'

import { Form, Submit } from '@redwoodjs/forms'
import {
  RedwoodUploadsComponent,
  getReadableErrorMessage,
  formatFileSize,
  ACCEPTED_IMAGE_TYPES,
} from '@redwoodjs/uploads-web'
import type { FileRejection } from '@redwoodjs/uploads-web'
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

const CustomFileRenderer = ({ files }) => (
  <div className="mt-4 flex flex-col gap-2">
    <h4 className="text-lg font-semibold">I approve!</h4>
    {files.map((file) => {
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

const CustomFileRejectionRenderer = ({ fileRejections }) => (
  <div>
    <h4 className="text-lg font-semibold">I reject!</h4>
    {fileRejections.map((reject) => (
      <div className="text-red-500" key={reject.file.name}>
        {reject.file.name}
        <div className="text-sm text-gray-500">
          {reject.errors.map((error) => (
            <div key={`${error.code}-${reject.file.name}`}>
              {getReadableErrorMessage(reject.file, error.code, error.message)}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const Demo12Page = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([])

  const [files, setFiles] = useState<File[]>([])
  const [result, setResult] = useState(null)

  const [demo12, { loading, error }] = useMutation(DEMO4_MUTATION, {
    onCompleted: (data) => {
      console.log('Files uploaded:', data.demo12.attachments)

      // clear the accepted files
      setAcceptedFiles([])
      // clear the rejected files
      setFileRejections([])
      // clear the files so no re-uploading
      setFiles([])

      toast.success(
        `${data.demo12.attachments.length} files uploaded successfully!`
      )
      setResult(data.demo12)
    },
    onError: (error) => {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  // Handler for dropping files
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }

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

        <Form onSubmit={onSubmit} className="mb-8 space-y-4">
          <RedwoodUploadsComponent
            name="attachments"
            acceptedFiles={acceptedFiles}
            setAcceptedFiles={setAcceptedFiles}
            fileRejections={fileRejections}
            setFileRejections={setFileRejections}
            maxSize={1.2 * 1024 * 1024} // 1.2MB
            maxFiles={4}
            accept={ACCEPTED_IMAGE_TYPES}
            onDrop={handleDrop} // Store the dropped files in state
            className="flex h-40 w-full items-center justify-center rounded-md border-2 border-dotted border-gray-300 bg-gray-50"
            activeClassName="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-green-300 bg-green-50 text-green-600 font-semibold"
            rejectClassName="flex h-40 w-full items-center justify-center rounded-md border-2 border-dashed border-purple-300 bg-purple-50 text-purple-600 font-semibold"
            fileRenderer={CustomFileRenderer}
            fileRejectionRenderer={CustomFileRejectionRenderer}
            disabled={loading}
            defaultMessage={'Drag or drop some images!'}
            activeMessage={'Yummy!!!'}
            rejectMessage={'I reject these!'}
          />

          <Submit
            disabled={loading}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Submit>
        </Form>

        {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

        {result &&
          result.attachments.length > 0 &&
          result.attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="mb-4 rounded-lg bg-gray-100 p-6"
            >
              <h2 className="mb-4 text-2xl font-semibold">
                File Metadata for {attachment.id}
              </h2>
              <ul className="space-y-2">
                <li>
                  <strong className="font-medium">Name:</strong>{' '}
                  {attachment.name}
                </li>
                <li>
                  <strong className="font-medium">Type:</strong>{' '}
                  {attachment.type}
                </li>
                <li>
                  <strong className="font-medium">Size:</strong>{' '}
                  {attachment.size} bytes
                </li>
              </ul>
            </div>
          ))}
      </div>
    </>
  )
}

export default Demo12Page

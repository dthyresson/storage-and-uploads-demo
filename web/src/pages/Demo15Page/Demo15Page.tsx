import { useState } from 'react'

import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import {
  useUploadProgress,
  useUploadsMutation,
  // getMutationName,
  // getUploadTokenHeaderName,
  // useUploadToken,
} from '@redwoodjs/uploads-web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'
import ProgressBar from 'src/components/ProgressBar'

const DEMO15_MUTATION = gql`
  mutation Demo15($input: Demo15Input!) {
    demo15(input: $input) {
      id
      name
      type
      size
    }
  }
`

const Demo15Page = () => {
  const [result, setResult] = useState([])
  const [inProgress, setInProgress] = useState(false)

  const [demo15, { error }] = useUploadsMutation(DEMO15_MUTATION, {
    onCompleted: (data) => {
      console.log('Files uploaded:', data.demo15)
      toast.success(`${data.demo15.length} file(s) uploaded successfully!`)
      setResult(data.demo15)
      setInProgress(false)
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error(`Error uploading file: ${error.message}`)
      setInProgress(false)
    },
  })

  const { context, progress, setProgress, onAbortHandler } =
    useUploadProgress(DEMO15_MUTATION)

  const onAbort = () => {
    onAbortHandler()
    setProgress(0)
    setInProgress(false)
  }

  const onSubmit = async (data) => {
    try {
      setInProgress(true)
      await demo15({
        variables: { input: data },
        context,
      })
    } catch (error) {
      console.error('Unexpected error:', error)
      setInProgress(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Demo index={15} />
      <div className="mb-4">
        <ProgressBar
          progress={progress}
          inProgress={inProgress}
          onAbort={onAbort}
        />
      </div>
      <Form onSubmit={onSubmit} className="mb-8">
        <div className="mb-4">
          <FileField
            name="uploadedFiles"
            disabled={inProgress}
            multiple={true}
            validation={{ required: true }}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-blue-50 file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-blue-700
              hover:file:bg-blue-100"
          />
          <FieldError
            name="uploadedFiles"
            className="mt-1 text-sm text-red-600"
          />
        </div>
        <Submit
          disabled={inProgress}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {inProgress ? 'Uploading...' : 'Upload File'}
        </Submit>
      </Form>

      {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

      {result && result.length > 0 && (
        <div className="rounded-lg bg-gray-100 p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">File Metadata</h2>
          {result.map((file, index) => (
            <div
              key={file.id}
              className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              <h3 className="mb-2 text-xl font-medium">File {index + 1}</h3>
              <ul className="space-y-2">
                <li>
                  <strong className="font-medium">Name:</strong> {file.name}
                </li>
                <li>
                  <strong className="font-medium">Type:</strong> {file.type}
                </li>
                <li>
                  <strong className="font-medium">Size:</strong> {file.size}{' '}
                  bytes
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Demo15Page

import { useState } from 'react'

import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { useUploadProgress } from '@redwoodjs/uploads-web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'
import ProgressBar from 'src/components/ProgressBar'

const DEMO14_MUTATION = gql`
  mutation Demo14($input: Demo1Input!) {
    demo14: demo1(input: $input) {
      id
      name
      type
      size
    }
  }
`

const Demo14Page = () => {
  const [result, setResult] = useState(null)
  const [inProgress, setInProgress] = useState(false)
  const { fetchOptionsWithProgress, progress, setProgress, onAbortHandler } =
    useUploadProgress()

  const [demo14, { error }] = useMutation(DEMO14_MUTATION, {
    onCompleted: (data) => {
      console.log('File uploaded:', data.demo14)
      toast.success(`File "${data.demo14.name}" uploaded successfully!`)
      setResult(data.demo14)
      setInProgress(false)
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error(`Error uploading file: ${error.message}`)
      setInProgress(false)
    },
  })

  const onAbort = () => {
    onAbortHandler()
    setProgress(0)
    setInProgress(false)
  }

  const onSubmit = async (data) => {
    try {
      setInProgress(true)
      await demo14({
        variables: { input: data },
        context: { fetchOptions: { ...fetchOptionsWithProgress } },
      })
    } catch (error) {
      console.error('Unexpected error:', error)
      setInProgress(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Demo index={14} />
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

      {result && (
        <div className="rounded-lg bg-gray-100 p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">File Metadata</h2>
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
      )}
    </div>
  )
}

export default Demo14Page

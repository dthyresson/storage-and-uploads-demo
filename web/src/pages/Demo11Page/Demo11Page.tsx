import { useState } from 'react'

import { Form, Submit } from '@redwoodjs/forms'
import {
  RedwoodUploadsComponent,
  PreviewFiles,
  PreviewFileRejections,
} from '@redwoodjs/uploads-web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

import { FileUploadResult } from './FileUploadResult'

const DEMO11_MUTATION = gql`
  mutation Demo11($input: Demo1Input!) {
    demo11: demo1(input: $input) {
      id
      name
      type
      size
    }
  }
`

const Demo11Page = () => {
  const [result, setResult] = useState(null)

  const [demo11, { loading, error }] = useMutation(DEMO11_MUTATION, {
    onCompleted: (data) => {
      console.log('File uploaded:', data.demo11)
      toast.success(`File "${data.demo11.name}" uploaded successfully!`)
      setResult(data.demo11)
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error(`Error uploading file: ${error.message}`)
    },
  })

  const [files, setFiles] = useState<File[]>([])

  const onSubmit = async (data) => {
    try {
      await demo11({
        variables: {
          input: {
            ...data,
            uploadedFiles: files,
          },
        },
      })
      setFiles([])
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Demo index={11} />
      {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}

      <Form onSubmit={onSubmit} className="mb-8 space-y-4">
        <RedwoodUploadsComponent name="uploadedFiles" setFiles={setFiles}>
          <PreviewFiles />
          <PreviewFileRejections />
        </RedwoodUploadsComponent>

        <Submit
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </Submit>
      </Form>

      <FileUploadResult result={result} />
    </div>
  )
}

export default Demo11Page

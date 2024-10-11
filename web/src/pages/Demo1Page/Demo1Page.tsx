import { useState } from 'react'

import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO1_MUTATION = gql`
  mutation Demo1($input: Demo1Input!) {
    demo1(input: $input) {
      id
      name
      type
      size
    }
  }
`

const Demo1Page = () => {
  const [result, setResult] = useState(null)

  const [demo1, { loading, error }] = useMutation(DEMO1_MUTATION, {
    onCompleted: (data) => {
      console.log('File uploaded:', data.demo1)
      toast.success(`File "${data.demo1.name}" uploaded successfully!`)
      setResult(data.demo1)
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error(`Error uploading file: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      await demo1({ variables: { input: data } })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Metadata title="Demo1" description="Demo1 page" />
      <Toaster />

      <h1 className="mb-4 text-3xl font-bold">Demo 1</h1>
      <p className="mb-6 text-gray-600">Upload a file to see the metadata</p>

      <Form onSubmit={onSubmit} className="mb-8">
        <div className="mb-4">
          <FileField
            name="uploadedFiles"
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
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload File'}
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

export default Demo1Page

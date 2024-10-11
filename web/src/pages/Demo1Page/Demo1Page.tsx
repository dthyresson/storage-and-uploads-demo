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
  const [demo1, { loading, error }] = useMutation(DEMO1_MUTATION)
  const [result, setResult] = useState(null)
  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const result = await demo1({ variables: { input: data } })
      console.log('File uploaded:', result.data.demo1)
      toast.success(`File "${result.data.demo1.name}" uploaded successfully!`)
      // set the result in the state
      setResult(result.data.demo1)
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(`Error uploading file: ${error.message}`)
    }
  }

  return (
    <>
      <Metadata title="Demo1" description="Demo1 page" />
      <Toaster />

      <h1>Demo 1</h1>
      <p>Upload a file to see the metadata</p>

      <Form onSubmit={onSubmit}>
        <div>
          <FileField name="uploadedFiles" validation={{ required: true }} />
          <FieldError name="uploadedFiles" />
        </div>
        <Submit disabled={loading}>
          {loading ? 'Uploading...' : 'Upload File'}
        </Submit>
      </Form>

      {error && <p>Error: {error.message}</p>}
      {result && (
        <div>
          <h2>File Metadata</h2>
          <ul>
            <li>
              <strong>Name:</strong> {result.name}
            </li>
            <li>
              <strong>Type:</strong> {result.type}
            </li>
            <li>
              <strong>Size:</strong> {result.size} bytes
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Demo1Page

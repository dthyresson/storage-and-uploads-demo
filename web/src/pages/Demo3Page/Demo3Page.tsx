import { useState } from 'react'

import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO3_MUTATION = gql`
  mutation Demo3Mutation($input: Demo3Input!) {
    demo3(input: $input) {
      id
      content
      transformedContent
      reference
      storageReference
    }
  }
`

const Demo3Page = () => {
  const [result, setResult] = useState(null)
  const [demo3] = useMutation(DEMO3_MUTATION, {
    onCompleted: (data) => {
      setResult(data.demo3)
      toast.success('Content submitted successfully')
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  const onSubmit = (data) => {
    demo3({ variables: { input: data } })
  }

  return (
    <>
      <Metadata title="Demo3" description="Demo3 page" />

      <h1>Demo3Page</h1>

      <Toaster />

      <Form onSubmit={onSubmit}>
        <TextField
          name="content"
          placeholder="Enter content"
          validation={{ required: true }}
        />
        <Submit>Submit</Submit>
      </Form>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>ID: {result.id}</p>
          <p>Content: {result.content}</p>
          <p>Transformed Content: {result.transformedContent}</p>
          <p>Reference: {result.reference}</p>
          <p>
            Link to Stored Content:{' '}
            <a href={result.storageReference} target="_blank" rel="noreferrer">
              View Stored Transformed Content
            </a>
          </p>
        </div>
      )}
    </>
  )
}

export default Demo3Page

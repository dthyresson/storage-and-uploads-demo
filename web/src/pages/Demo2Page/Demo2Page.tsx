import { useState } from 'react'

import { Form, TextField, Submit } from '@redwoodjs/forms'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO2_MUTATION = gql`
  mutation Demo2Mutation($input: Demo2Input!) {
    demo2(input: $input) {
      content
      transformedContent
      reference
    }
  }
`

const Demo2Page = () => {
  const [result, setResult] = useState(null)
  const [demo2] = useMutation(DEMO2_MUTATION, {
    onCompleted: (data) => {
      setResult(data.demo2)
      toast.success('Content submitted successfully')
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  const onSubmit = (data) => {
    demo2({ variables: { input: data } })
  }

  return (
    <>
      <Metadata title="Demo2" description="Demo2 page" />

      <h1>Demo2Page</h1>

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
          <p>Content: {result.content}</p>
          <p>Transformed Content: {result.transformedContent}</p>
          <p>
            Link to Stored Content:{' '}
            <a href={result.reference} target="_blank" rel="noreferrer">
              View Stored Transformed Content
            </a>
          </p>
        </div>
      )}
    </>
  )
}

export default Demo2Page

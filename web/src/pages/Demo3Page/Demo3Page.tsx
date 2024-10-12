import { useState } from 'react'

import { Form, TextField, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

const DEMO3_MUTATION = gql`
  mutation Demo3Mutation($input: Demo3Input!) {
    demo3(input: $input) {
      id
      content
      transformedContent
      reference
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
      <div className="container mx-auto px-4 py-8">
        <Demo index={3} />

        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Enter content
              </label>
              <TextField
                name="content"
                placeholder="Enter content"
                validation={{ required: true }}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
            <Submit className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
              Submit
            </Submit>
          </Form>
        </div>

        {result && (
          <div className="rounded bg-white px-8 pb-8 pt-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Result:</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">ID:</span> {result.id}
              </p>
              <p>
                <span className="font-semibold">Content:</span> {result.content}
              </p>
              <p>
                <span className="font-semibold">Transformed Content:</span>{' '}
                {result.transformedContent}
              </p>
              <p>
                <span className="font-semibold">Link to Stored Content:</span>{' '}
                <a
                  href={result.reference}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  View Stored Transformed Content
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Demo3Page

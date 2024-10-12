import { useState } from 'react'

import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Demo from 'src/components/Demo/Demo'

const DEMO4_MUTATION = gql`
  mutation Demo4($input: Demo4Input!) {
    demo4(input: $input) {
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

const Demo4Page = () => {
  const [result, setResult] = useState(null)

  const [demo4, { loading }] = useMutation(DEMO4_MUTATION, {
    onCompleted: (data) => {
      console.log('Files uploaded:', data.demo4.attachments)
      toast.success(
        `${data.demo4.attachments.length} files uploaded successfully!`
      )
      setResult(data.demo4)
    },
    onError: (error) => {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      await demo4({ variables: { input: data } })
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="container mx-auto px-4 py-8">
        <Demo index={4} />

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Form onSubmit={onSubmit} className="space-y-4">
            <div>
              <FileField
                name="attachments"
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
                name="attachments"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <Submit
              disabled={loading}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              {loading ? 'Uploading...' : 'Upload Files'}
            </Submit>
          </Form>
        </div>

        {result && (
          <div className="rounded bg-white px-8 pb-8 pt-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Uploaded Images</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {result.attachments.map((attachment) => (
                <li key={attachment.id} className="rounded-lg bg-gray-100 p-4">
                  <h3 className="mb-2 font-semibold">{attachment.name}</h3>
                  <img
                    src={attachment.reference}
                    alt={attachment.name}
                    className="mb-2 h-48 w-full rounded-lg object-cover"
                  />
                  <p className="text-sm text-gray-600">
                    <strong>Type:</strong> {attachment.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Size:</strong> {attachment.size} bytes
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Demo4Page

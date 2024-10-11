import { useState } from 'react'

import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO4_MUTATION = gql`
  mutation Demo4($input: Demo4Input!) {
    demo4(input: $input) {
      images {
        id
        name
        type
        size
        url
      }
    }
  }
`

const Demo4Page = () => {
  const [demo4, { loading, error }] = useMutation(DEMO4_MUTATION)
  const [result, setResult] = useState(null)

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const result = await demo4({ variables: { input: data } })
      console.log('Files uploaded:', result.data.demo4.images)
      toast.success(
        `${result.data.demo4.images.length} files uploaded successfully!`
      )
      setResult(result.data.demo4)
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    }
  }

  return (
    <>
      <Metadata title="Demo4" description="Demo4 page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Demo 4: Multiple File Uploads
        </h1>
        <p className="mb-6 text-gray-600">
          Upload multiple files to see the metadata and images
        </p>

        <div className="mb-8 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Form onSubmit={onSubmit} className="space-y-4">
            <div>
              <FileField
                name="images"
                multiple={true}
                validation={{ required: true }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:rounded-full file:border-0
                  file:bg-blue-50 file:px-4
                  file:py-2 file:text-sm
                  file:font-semibold file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <FieldError name="images" className="mt-1 text-sm text-red-600" />
            </div>
            <Submit
              disabled={loading}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              {loading ? 'Uploading...' : 'Upload Files'}
            </Submit>
          </Form>
        </div>

        {error && <p className="mb-4 text-red-600">Error: {error.message}</p>}
        {result && (
          <div className="rounded bg-white px-8 pb-8 pt-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Uploaded Images</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {result.images.map((image) => (
                <li key={image.id} className="rounded-lg bg-gray-100 p-4">
                  <h3 className="mb-2 font-semibold">{image.name}</h3>
                  <img
                    src={image.url}
                    alt={image.name}
                    className="mb-2 h-48 w-full rounded-lg object-cover"
                  />
                  <p className="text-sm text-gray-600">
                    <strong>Type:</strong> {image.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Size:</strong> {image.size} bytes
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

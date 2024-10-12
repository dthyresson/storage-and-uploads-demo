import { Form, FileField, Submit, FieldError } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useUploadsMutation } from '@redwoodjs/uploads-web'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const DEMO6_MUTATION = gql`
  mutation Demo6($input: Demo6Input!) {
    demo6(input: $input) {
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

const Demo6Page = () => {
  const [demo6, { loading, error }] = useUploadsMutation(DEMO6_MUTATION, {
    onCompleted: (data) => {
      console.log('Files uploaded:', data.demo6.images)
      toast.success(`${data.demo6.images.length} files uploaded successfully!`)
      navigate(routes.demo6Images())
    },
    onError: (error) => {
      console.error('Error uploading files:', error)
      toast.error(`Error uploading files: ${error.message}`)
    },
  })

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      await demo6({ variables: { input: data } })
    } catch (error) {
      // This catch block is now optional, as errors are handled in onError
      console.error('Unexpected error:', error)
    }
  }

  return (
    <>
      <Metadata
        title="Demo 6: File Uploads with Storage, Prisma Reference, and Upload Token Validation"
        description="Demo 6 page"
      />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Demo 6: File Uploads with Storage, Prisma Reference, and Upload Token
          Validation
        </h1>
        <p className="mb-6 text-gray-600">
          Upload multiple images or documents to see the metadata and files
          stored in the database. Max 3 files, 1MB each.
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

        <Link
          to={routes.demo6Images()}
          className="font-semibold text-blue-500 hover:text-blue-700"
        >
          View Uploaded Images or Documents
        </Link>
      </div>
    </>
  )
}

export default Demo6Page
